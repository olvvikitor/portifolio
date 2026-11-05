import type { FlowStep } from '../data/profile'

// "Como funciona": etapas numeradas ligadas por uma linha. A etapa principal (onde está a parte difícil)
// vem invertida e com rótulo, para o destaque não depender só de cor.
type Props = { steps: FlowStep[]; core?: number }

export function FlowDiagram({ steps, core }: Props) {
  return (
    <figure className="flow">
      <figcaption className="flow-caption">Como funciona</figcaption>
      <ol className="flow-steps">
        {steps.map((s, i) => (
          <li key={s.step} className={i === core ? 'flow-step is-core' : 'flow-step'}>
            <span className="flow-num" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="flow-body">
              <p className="flow-name">
                {s.step}
                {i === core && <span className="flow-tag">Etapa principal</span>}
              </p>
              {s.detail && <p className="flow-detail">{s.detail}</p>}
            </div>
          </li>
        ))}
      </ol>
    </figure>
  )
}
