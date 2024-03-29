import {
  AbortCarData,
  CarProps,
  EngineStatus,
  SuccessResponse,
  UpdateCarResponse
} from '../../interfaces';
import { GarageInfoView } from '../view/garage_view/garage_info_view';

export async function regulateEngine(
  id: string,
  status: EngineStatus,
  abortData?: AbortCarData
): Promise<UpdateCarResponse> {
  let isEngineBroken: boolean = false;
  try {
    const response: Response = await fetch(
      `http://127.0.0.1:3000/engine?id=${id}&status=${status}`,
      {
        method: 'PATCH',
        signal: abortData?.abort?.signal
      }
    );

    if (response.status === 500 && abortData) {
      isEngineBroken = true;
      abortData.abort.abort();
    }
    if (response.status === 404) return undefined;
    const parsedResponse: CarProps | SuccessResponse = await response.json();
    return parsedResponse;
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      if (isEngineBroken) GarageInfoView.moveCar(id, 'stop');
      if (!abortData) throw new Error('abortData is undefined');
      if (!isEngineBroken)
        GarageInfoView.updateButtonsState({ btn: abortData.adjacentBtn, status: false });

      await regulateEngine(id, 'stopped');
      if (isEngineBroken) return { success: false };
      if (!isEngineBroken) {
        GarageInfoView.updateButtonsState({ btn: abortData.btn, status: true });
        GarageInfoView.moveCar(id, 'reset');
      }
      return undefined;
    }
    throw err;
  }
}
