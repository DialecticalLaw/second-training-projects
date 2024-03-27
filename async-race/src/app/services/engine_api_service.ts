import { CarProps, EngineStatus, SuccessResponse } from '../../interfaces';
import { GarageInfoView } from '../view/garage_view/garage_info_view';

export async function regulateEngine(
  id: string,
  status: EngineStatus
): Promise<CarProps | SuccessResponse | undefined> {
  const abortController: AbortController = new AbortController();
  try {
    const response: Response = await fetch(
      `http://127.0.0.1:3000/engine?id=${id}&status=${status}`,
      {
        method: 'PATCH',
        signal: abortController.signal
      }
    );
    if (response.status === 500) abortController.abort();
    const parsedResponse: CarProps | SuccessResponse = await response.json();
    return parsedResponse;
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      regulateEngine(id, 'stopped');
      GarageInfoView.moveCar(id, 'stop');
      return undefined;
    }
    throw err;
  }
}
