import fs from 'node:fs'
import path from 'node:path'
const dist = path.resolve('dist')
const routes = {
  oferta: { title: 'Oferta architekta w Legionowie | AMK', description: 'Poznaj sposób współpracy z Architektem Marcinem Kuryłowiczem. Zakres prac ustalany jest indywidualnie podczas bezpośredniej rozmowy.', h1: 'Oferta architekta w Legionowie dopasowana do Twojego projektu', h2: 'Najpierw kontekst. Później rozwiązania.' },
  realizacje: { title: 'Realizacje architektoniczne | AMK Legionowo', description: 'Portfolio Architekta Marcina Kuryłowicza. Strona przygotowana do prezentacji kolejnych realizacji i projektów.', h1: 'Realizacje architektoniczne w Legionowie i okolicach', h2: 'Realizacje pojawią się tutaj wkrótce.' },
  kontakt: { title: 'Kontakt z architektem w Legionowie | AMK', description: 'Skontaktuj się z Architektem Marcinem Kuryłowiczem. Telefon, e-mail i adres pracowni w Legionowie.', h1: 'Kontakt z architektem w Legionowie', h2: 'Opowiedz o swoim projekcie.' }
}
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
for (const [slug, data] of Object.entries(routes)) {
  const dir = path.join(dist, slug); fs.mkdirSync(dir, { recursive: true })
  const html = template.replace(/<title>[^<]*<\/title>/, `<title>${data.title}</title>`).replace(/<meta name="description" content="[^"]*"\/>/, `<meta name="description" content="${data.description}"/>`).replace(/<h1>[^<]*<\/h1>/, `<h1>${data.h1}</h1>`).replace(/<h2>[^<]*<\/h2>/, `<h2>${data.h2}</h2>`)
  fs.writeFileSync(path.join(dir, 'index.html'), html)
}
