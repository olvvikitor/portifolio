type Props = { steps: string[]; core?: number }

export function FlowDiagram({ steps, core }: Props) {
  return (
    <figure className="flow">
      <figcaption className="meta">Fluxo</figcaption>
      <ol className="flow-steps">
        {steps.map((step, i) => (
          <li key={step} className={i === core ? 'flow-step is-core' : 'flow-step'}>
            {i > 0 && <span className="flow-arrow" aria-hidden="true" />}
            <span className="flow-node">{step}</span>
          </li>
        ))}
      </ol>
    </figure>
  )
}
