// Títulos com trechos "agressivos": o que vem entre *asteriscos* sai em peso máximo e largura condensada
// (mesma família, outro eixo), para dar contraste sem trazer uma segunda fonte.
export function Emph({ text }: { text: string }) {
  return (
    <>
      {text.split('*').map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="emph">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  )
}
