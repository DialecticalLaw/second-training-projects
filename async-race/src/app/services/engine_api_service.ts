import {
  AbortCarData,
  EngineStatus,
  UpdateBtnValidityClass,
  UpdateCarResponse
} from '../../interfaces';
import { isCarsResets } from '../controller/addition_actions_controller';
import { raceBtn } from '../view/components/garage/garage_options/garage_options';
import { GarageInfoView } from '../view/garage_view/garage_info_view';
import { GarageOptionsView } from '../view/garage_view/garage_options_view';
import { updateButtonState } from '../view/garage_view/garage_view';

async function getEngineResponse(
  id: string,
  status: EngineStatus,
  abortData?: AbortCarData
): Promise<Response> {
  const response: Promise<Response> = fetch(
    `http://127.0.0.1:3000/engine?id=${id}&status=${status}`,
    {
      method: 'PATCH',
      signal: abortData?.abort?.signal
    }
  );
  return response;
}

export async function regulateEngine(
  id: string,
  status: EngineStatus,
  abortData?: AbortCarData
): Promise<UpdateCarResponse> {
  let isEngineBroken: boolean = false;
  try {
    const response: Response = await getEngineResponse(id, status, abortData);
    if ((response.status === 500 || response.status === 404) && abortData) {
      isEngineBroken = true;
      abortData.abort.abort();
    }
    return await response.json();
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      if (!abortData) throw new Error('abortData is undefined');
      if (!isEngineBroken) updateButtonState({ btn: abortData.adjacentBtn, status: false });
      const stoppedCarEvent: CustomEvent = new CustomEvent('carstopped');

      if (isEngineBroken) {
        GarageInfoView.moveCar(id, 'stop');
        document.dispatchEvent(stoppedCarEvent);
        return { success: false };
      }

      await regulateEngine(id, 'stopped');
      document.dispatchEvent(stoppedCarEvent);
      if (!isEngineBroken) {
        if (isCarsResets()) {
          updateButtonState({ btn: raceBtn, status: true });
          GarageOptionsView.toggleUpdateBtnValidity(true, UpdateBtnValidityClass.Ondrive);
        }
        updateButtonState({ btn: abortData.btn, status: true });
        GarageInfoView.moveCar(id, 'reset');
      }
      return undefined;
    }
    throw err;
  }
}
