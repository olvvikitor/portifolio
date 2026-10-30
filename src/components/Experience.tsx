import { jobs } from '../data/profile'
import { Section, Stack } from './Section'

export function Experience() {
  return (
    <Section id="experiencia" title="Experiência">
      <ol className="timeline">
        {jobs.map((job) => (
          <li key={job.role + job.period} className="job">
            <div className="job-head">
              <h3>
                {job.role} <span className="muted">· {job.company}</span>
              </h3>
              <p className="meta">
                <time>{job.period}</time> · {job.place}
              </p>
            </div>
            {job.summary && <p className="job-summary">{job.summary}</p>}
            {job.highlights && (
              <ul className="highlights">
                {job.highlights.map((h) => (
                  <li key={h.title}>
                    <p>
                      <strong>{h.title}.</strong> {h.text}
                    </p>
                    <Stack items={h.stack} />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </Section>
  )
}
