import type { CatalogItem } from "../_lib/types";

type WorkspacePreviewProps = {
  desk: CatalogItem;
  chair: CatalogItem;
  accessories: CatalogItem[];
};

export function WorkspacePreview({
  desk,
  chair,
  accessories,
}: WorkspacePreviewProps) {
  const hasMonitor = accessories.some((item) => item.kind === "monitor");
  const hasLamp = accessories.some((item) => item.kind === "lamp");
  const hasPlant = accessories.some((item) => item.kind === "plant");
  const isStudioDesk = desk.id === "desk-white";
  const isSoftChair = chair.id === "chair-soft";
  const accessoryNames = accessories.map((item) => item.name).join(", ");

  return (
    <div
      className="relative aspect-[4/3] min-h-80 w-full overflow-hidden rounded-[1.75rem] bg-[#e8ece7]"
      role="img"
      aria-label={`Workspace preview with ${desk.name}, ${chair.name}${
        accessoryNames ? `, ${accessoryNames}` : ", and no accessories"
      }`}
    >
      <div className="absolute inset-x-0 bottom-0 h-[33%] bg-[#d6c8b6]" />
      <div className="absolute left-[9%] top-[10%] h-[32%] w-[23%] rounded-t-full border-[10px] border-white/70 bg-[#b9d0c6] shadow-sm" />
      <div className="absolute right-[9%] top-[10%] h-[31%] w-[20%] rounded-full bg-white/40" />

      <div
        className={`absolute top-[38%] h-[9%] rounded-md shadow-lg transition-all duration-300 ${
          isStudioDesk ? "left-[25%] w-[51%]" : "left-[20%] w-[61%]"
        }`}
        style={{ backgroundColor: desk.color }}
      />
      {isStudioDesk ? (
        <>
          <div className="absolute left-[29%] top-[45%] h-[30%] w-[3%] rounded-b-md bg-white shadow-sm" />
          <div className="absolute right-[28%] top-[45%] h-[30%] w-[3%] rounded-b-md bg-white shadow-sm" />
          <div className="absolute left-[26%] top-[72%] h-[2%] w-[9%] rounded-full bg-slate-300" />
          <div className="absolute right-[25%] top-[72%] h-[2%] w-[9%] rounded-full bg-slate-300" />
        </>
      ) : (
        <>
          <div className="absolute left-[23%] top-[45%] h-[33%] w-[4%] rounded-b-md bg-[#414a47]" />
          <div className="absolute right-[22%] top-[45%] h-[33%] w-[4%] rounded-b-md bg-[#414a47]" />
        </>
      )}

      {hasMonitor && (
        <>
          <div className="absolute left-[42%] top-[18%] h-[23%] w-[30%] rounded-lg border-[6px] border-[#263330] bg-[#bdd6cf] shadow-xl">
            <div className="absolute inset-2 rounded-sm bg-gradient-to-br from-white/50 to-transparent" />
          </div>
          <div className="absolute left-[56%] top-[40%] h-[9%] w-[2%] bg-[#263330]" />
        </>
      )}

      {hasPlant && (
        <>
          <div className="absolute left-[25%] top-[28%] h-[12%] w-[4%] rounded-full bg-[#466d50]" />
          <div className="absolute left-[21%] top-[29%] h-[10%] w-[5%] -rotate-12 rounded-full bg-[#658966]" />
          <div className="absolute left-[23%] top-[39%] h-[7%] w-[8%] rounded-b-lg bg-[#bf7751]" />
        </>
      )}

      {hasLamp && (
        <div className="absolute right-[5%] top-[20%] h-[27%] w-[18%] drop-shadow-lg">
          <div className="absolute bottom-0 left-[12%] h-[5%] w-[65%] rounded-full bg-[#273632]" />
          <div className="absolute bottom-[4%] left-[42%] h-[67%] w-[7%] origin-bottom -rotate-[20deg] rounded-full bg-[#273632]" />
          <div className="absolute left-[31%] top-[3%] h-[33%] w-[53%] -rotate-[10deg] rounded-t-full rounded-br-full bg-[#d79a45]" />
          <div className="absolute left-[42%] top-[27%] size-4 rounded-full bg-[#ffe6a3] shadow-[0_0_18px_8px_rgba(255,220,130,0.55)]" />
        </div>
      )}

      {isSoftChair ? (
        <>
          <div className="absolute left-[38%] top-[52%] h-[28%] w-[27%] rounded-[45%_45%_30%_30%] bg-[#B1A28B] shadow-lg" />
          <div className="absolute left-[35%] top-[70%] h-[10%] w-[33%] rounded-[45%] bg-[#9b8c75] shadow-md" />
        </>
      ) : (
        <>
          <div className="absolute left-[37%] top-[51%] h-[27%] w-[29%] rounded-[38%_38%_20%_20%] border-x-[7px] border-[#182724] bg-[#35504b] shadow-lg">
            <div className="mx-auto mt-4 h-[2px] w-[70%] bg-white/20" />
            <div className="mx-auto mt-3 h-[2px] w-[70%] bg-white/20" />
            <div className="mx-auto mt-3 h-[2px] w-[70%] bg-white/20" />
          </div>
          <div className="absolute left-[34%] top-[70%] h-[11%] w-[35%] rounded-xl bg-[#182724] shadow-md" />
        </>
      )}
      <div className="absolute left-[50%] top-[78%] h-[13%] w-[3%] bg-[#303a38]" />
      <div className="absolute left-[43%] top-[89%] h-[2%] w-[17%] rounded-full bg-[#303a38]" />

      <span className="absolute bottom-4 left-4 rounded-full bg-white/85 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
        Live workspace preview
      </span>
    </div>
  );
}
