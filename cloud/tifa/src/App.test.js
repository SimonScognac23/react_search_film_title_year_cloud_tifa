// 🔹 IMPORTAZIONI per il testing
import { render, screen } from '@testing-library/react'; // render = funzione per "montare" un componente React in un ambiente di test virtuale | screen = oggetto che fornisce metodi per trovare elementi nel DOM virtuale
import App from './App'; // Importa il componente App che vogliamo testare

// 🔹 DEFINIZIONE DEL TEST
// test() = funzione globale di Jest (framework di testing) che definisce un singolo test
// Primo parametro = stringa descrittiva che spiega cosa fa il test
// Secondo parametro = funzione che contiene il codice del test
test('renders learn react link', () => {
  
  // 🔹 FASE 1: ARRANGE (Preparazione)
  // render() = "monta" il componente App in un DOM virtuale per il testing
  // Questo crea una versione del componente che possiamo ispezionare senza aprire un browser
  render(<App />);
  
  // 🔹 FASE 2: ACT (Azione) + ASSERT (Verifica)
  // screen.getByText() = cerca un elemento nel DOM virtuale che contiene il testo specificato
  // /learn react/i = espressione regolare (regex):
  //   - /.../ = delimitatori della regex
  //   - learn react = testo da cercare
  //   - i = flag "case insensitive" (ignora maiuscole/minuscole)
  // Quindi trova elementi che contengono "learn react", "Learn React", "LEARN REACT", ecc.
  const linkElement = screen.getByText(/learn react/i);
  
  // 🔹 FASE 3: ASSERT (Verifica finale)
  // expect() = funzione Jest che crea un'aspettativa su un valore
  // .toBeInTheDocument() = matcher che verifica se l'elemento esiste nel DOM
  // Se l'elemento NON esiste, il test fallisce con un messaggio di errore
  expect(linkElement).toBeInTheDocument();
});
