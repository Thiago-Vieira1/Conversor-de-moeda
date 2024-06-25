const puppeteer = require('puppeteer');
const rl = require('readline-sync');

// Pergunta ao usuário qual moeda ele deseja converter e qual a moeda final
// Se o usuário não digitar nada, assume 'dolar' como moeda base, 'real' como moeda final e 1 para quantidade de moedas
const moedaBase = rl.question('Qual moeda você deseja converter: ') || 'dolar';
const moedaFinal = rl.question('Para qual moeda você deseja converter: ') || 'real';
const quantMoeda = rl.question(`Quanto de ${moedaBase} você deseja converter: `) || '1';

// Função assíncrona que realiza a conversão de moeda
(async () => {
    // Lança um novo navegador controlado pelo Puppeteer
    const browser = await puppeteer.launch(/*{headless: false}*/);
    const page = await browser.newPage();
    
    // Constrói a URL para a pesquisa no Google, incluindo a quantidade de moeda base e final fornecidas pelo usuário
    const url = `https://www.google.com/search?q=${quantMoeda}+${moedaBase}+para+${moedaFinal}&client=opera-gx&hs=Gfn&sca_esv=34de302c3e752e49&sxsrf=ADLYWIIJqjz9RlvkLZ9yrZYJggy9tF1KBQ%3A1716850242560&ei=Qg5VZsziIc3Q1sQPyKS_0AM&udm=&ved=0ahUKEwjMi9zG9a6GAxVNqJUCHUjSDzoQ4dUDCBA&uact=5&oq=dolar+para+real&gs_lp=Egxnd3Mtd2l6LXNlcnAiD2RvbGFyIHBhcmEgcmVhbDIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzIKEAAYsAMY1gQYRzINEAAYgAQYsAMYQxiKBTINEAAYgAQYsAMYQxiKBUjoA1AAWABwAXgBkAEAmAEAoAEAqgEAuAEDyAEAmAIBoAIEmAMAiAYBkAYKkgcBMaAHAA&sclient=gws-wiz-serp`;
    await page.goto(url);

    // Avalia a página e retorna o valor da conversão encontrado
    const result = await page.evaluate(() => {
        return document.querySelector('.lWzCpb.a61j6').value;;
      });
    
    // Imprime o valor da conversão no console
    console.log(`A valor de ${quantMoeda} ${moedaBase} em ${moedaFinal} é ${result}`);
    await browser.close();
  })();