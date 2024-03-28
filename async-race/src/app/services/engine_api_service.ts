import { CarProps, EngineStatus, SuccessResponse } from '../../interfaces';
import { GarageInfoView } from '../view/garage_view/garage_info_view';

export async function regulateEngine(
  id: string,
  status: EngineStatus,
  abortController?: AbortController
): Promise<CarProps | SuccessResponse | undefined> {
  try {
    const response: Response = await fetch(
      `http://127.0.0.1:3000/engine?id=${id}&status=${status}`,
      {
        method: 'PATCH',
        signal: abortController?.signal
      }
    );

    if (response.status === 500 && abortController) abortController.abort();
    if (response.status === 404) return undefined;
    const parsedResponse: CarProps | SuccessResponse = await response.json();
    return parsedResponse;
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      GarageInfoView.moveCar(id, 'stop');
      await regulateEngine(id, 'stopped');
      return undefined;
    }
    throw err;
  }
}
