import { WorkspaceConfigurator } from "./_components/workspace-configurator";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f6f6f2] text-slate-900">
      <header className="border-b border-slate-200/80">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl bg-emerald-900 text-sm font-bold text-white">
              W
            </span>
            <span className="font-semibold tracking-tight">Workform</span>
          </div>
          <span className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-500">
            Live configurator
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">
            Workspace rental
          </p>
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
            Design your workspace
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            Build a comfortable setup from flexible monthly rentals. Choose
            each piece and see your workspace update instantly.
          </p>
        </div>

        <WorkspaceConfigurator />
      </main>
    </div>
  );
}
