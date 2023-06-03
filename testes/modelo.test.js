const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  // limpa dados de todas as tabelas
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas(); 
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].num_respostas).toBe(0);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta-1);
});

test('Testando cadastrar resposta',() => {
  modelo.cadastrar_pergunta('Qual a resposta da vida, universo e tudo mais?');
  perguntas = modelo.listar_perguntas();
  expect(perguntas[0].num_respostas).toBe(0)
  modelo.cadastrar_resposta(perguntas[0].id_pergunta, '42!!!!');
  perguntas = modelo.listar_perguntas();
  expect(perguntas[0].num_respostas).toBe(1)
});

test('Testando get pergunta',() => {
  modelo.cadastrar_pergunta('Qual a resposta da vida, universo e tudo mais?');
  modelo.cadastrar_pergunta('Quem roubou a Lindalva?');
  modelo.cadastrar_pergunta('Qual a prova original do último teorema de Fermat?');
  const perguntas = modelo.listar_perguntas();
  let id = perguntas[1].id_pergunta;
  expect(modelo.get_pergunta(id).texto).toBe('Quem roubou a Lindalva?');
});

test('Testando get resposta', () => {
  modelo.cadastrar_pergunta('A hipótese de Rienmann está correta?');
  modelo.cadastrar_pergunta('Se \'sin(x) = 2\', quanto vale x?')
  const perguntas = modelo.listar_perguntas();
  modelo.cadastrar_resposta(perguntas[0].id_pergunta, 'Sim ou não');
  let id = perguntas[0].id_pergunta;
  expect(modelo.get_respostas(id)[0].texto).toBe('Sim ou não');

})