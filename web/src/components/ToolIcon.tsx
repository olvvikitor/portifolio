import {
  siApachespark,
  siDocker,
  siFastapi,
  siNestjs,
  siNextdotjs,
  siOpencv,
  siPandas,
  siPostgresql,
  siPrisma,
  siPython,
  siPytorch,
  siReact,
  siRedis,
  siSelenium,
  siTypescript,
  siUltralytics,
} from 'simple-icons'

// Ícones de marca (Simple Icons, CC0), em uma cor só (currentColor) para seguir o tema e não brigar com o --accent.
// Marca sem ícone no Simple Icons: desenho genérico de traço (planilha para o Excel, barras para o Power BI, banco para SQL, sigma para DAX, chip para a OpenAI).
const paths: Record<string, string> = {
  Python: siPython.path,
  pandas: siPandas.path,
  Spark: siApachespark.path,
  Selenium: siSelenium.path,
  TypeScript: siTypescript.path,
  React: siReact.path,
  'Next.js': siNextdotjs.path,
  NestJS: siNestjs.path,
  PostgreSQL: siPostgresql.path,
  Prisma: siPrisma.path,
  Redis: siRedis.path,
  Docker: siDocker.path,
  PyTorch: siPytorch.path,
  OpenCV: siOpencv.path,
  FastAPI: siFastapi.path,
  YOLOv8: siUltralytics.path,
}

const strokes: Record<string, string> = {
  Excel: 'M4 3.5h16a.5.5 0 0 1 .5.5v16a.5.5 0 0 1-.5.5H4a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5ZM3.5 9h17M3.5 15h17M9 3.5v17',
  'Power BI': 'M5 20.5V13M10 20.5V9M15 20.5V5M20 20.5V3.5',
  SQL: 'M4 6c0-1.4 3.6-2.5 8-2.5s8 1.1 8 2.5-3.6 2.5-8 2.5S4 7.4 4 6ZM4 6v12c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V6M4 12c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5',
  DAX: 'M17.5 4.5h-11l6 7.5-6 7.5h11',
  OpenAI: 'M7 7h10v10H7zM10 3.5V7M14 3.5V7M10 17v3.5M14 17v3.5M3.5 10H7M3.5 14H7M17 10h3.5M17 14h3.5',
}

export function ToolIcon({ name }: { name: string }) {
  const d = paths[name]
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden="true" className="tool-icon">
      {d ? (
        <path d={d} fill="currentColor" />
      ) : (
        <path d={strokes[name] ?? strokes.Excel} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" />
      )}
    </svg>
  )
}
