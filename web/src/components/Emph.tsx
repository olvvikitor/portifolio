// Títulos com trechos de destaque: o que vem entre *asteriscos* sai em vermelho (--accent) e um peso acima.
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
