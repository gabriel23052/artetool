export class DebounceCancelledError extends Error {}

/** 
 * Função utilitária que encapsula outra 
 * função em um contexto que só executa
 * após um tempo de espera sem novas
 * chamadas
 * @param func Função que será chamada após 
 * o tempo de espera
 * @param wait Tempo de espera em milissegundos
 * @return Promise que resolve caso a função
 * execute, rejeita caso uma nova chamada tenha
 * sido efetuada antes do tempo de espera
 */
export function debounce(
  func: () => Promise<void>,
  wait: number,
): () => Promise<void> {
  let timeoutId: number | null = null;
  let rejectPrevious: ((err: Error) => void) | null = null;

  return () => {
    if (rejectPrevious) {
      rejectPrevious(new DebounceCancelledError());
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    return new Promise<void>((resolve, reject) => {
      rejectPrevious = reject;
      timeoutId = setTimeout(async () => {
        try {
          await func();
          resolve();
        } catch (err) {
          reject(err);
        } finally {
          timeoutId = null;
          rejectPrevious = null;
        }
      }, wait);
    });
  };
}
