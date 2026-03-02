/** 
 * Função utilitária para retornar elementos
 * do DOM selecionados através do atributo
 * "data-selector"
 * @param selector Seletor do elemento (data-selector)
 */
export default <T extends Element>(selector: string): T => {
  const element = document.querySelector(`[data-selector="${selector}"]`);
  if (!(element instanceof Element)) {
    throw new Error(`O elemento "${selector}" não pode ser localizado no DOM`);
  }
  return element as T;
};