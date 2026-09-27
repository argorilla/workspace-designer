import type { CatalogItem, MonitorQuantity } from "../_lib/types";

type WorkspacePreviewProps = {
  desk: CatalogItem;
  chair: CatalogItem;
  accessories: CatalogItem[];
  monitorQuantity: MonitorQuantity;
};

export function WorkspacePreview({
  desk,
  chair,
  accessories,
  monitorQuantity,
}: WorkspacePreviewProps) {
  const hasLamp = accessories.some((item) => item.kind === "lamp");
  const hasPlant = accessories.some((item) => item.kind === "plant");
  const isStudioDesk = desk.id === "desk-white";
  const isSoftChair = chair.id === "chair-soft";
  const isGamingChair = chair.id === "chair-gaming";
  const accessoryNames = accessories.map((item) => item.name).join(", ");
  const previewContents = [
    monitorQuantity > 0
      ? `${monitorQuantity} Focus Monitor${monitorQuantity === 2 ? "s" : ""}`
      : "",
    accessoryNames,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div
      className="relative aspect-[4/3] min-h-80 w-full overflow-hidden rounded-[1.75rem] bg-[#e8ece7]"
      role="img"
      aria-label={`Workspace preview with ${desk.name}, ${chair.name}${
        previewContents ? `, ${previewContents}` : ", and no accessories"
      }`}
    >
      <div className="absolute inset-x-0 bottom-0 h-[33%] bg-[#d6c8b6]" />
      <div className="absolute left-[9%] top-[10%] h-[32%] w-[23%] rounded-t-full border-[10px] border-white/70 bg-[#b9d0c6] shadow-sm" />
      <div className="absolute right-[9%] top-[10%] h-[31%] w-[20%] rounded-full bg-white/40" />

      <div
        className={`absolute top-[38%] h-[9%] rounded-md shadow-lg transition-all duration-300 ${
          isStudioDesk ? "left-[27%] w-[48%]" : "left-[12%] w-[76%]"
        }`}
        style={{ backgroundColor: desk.color }}
      />
      {isStudioDesk ? (
        <>
          <div className="absolute left-[30%] top-[45%] h-[30%] w-[3%] rounded-b-md bg-white shadow-sm" />
          <div className="absolute right-[29%] top-[45%] h-[30%] w-[3%] rounded-b-md bg-white shadow-sm" />
          <div className="absolute left-[26%] top-[72%] h-[2%] w-[9%] rounded-full bg-slate-300" />
          <div className="absolute right-[25%] top-[72%] h-[2%] w-[9%] rounded-full bg-slate-300" />
        </>
      ) : (
        <>
          <div className="absolute left-[16%] top-[45%] h-[33%] w-[4%] rounded-b-md bg-[#414a47]" />
          <div className="absolute right-[15%] top-[45%] h-[33%] w-[4%] rounded-b-md bg-[#414a47]" />
        </>
      )}

      {Array.from({ length: monitorQuantity }).map((_, index) => {
        const monitorPosition =
          monitorQuantity === 2
            ? index === 0
              ? "left-[30%]"
              : "left-[52%]"
            : isStudioDesk
              ? "left-[39%]"
              : "left-[40%]";
        const monitorWidth = monitorQuantity === 2 ? "w-[20%]" : "w-[25%]";
        const standPosition =
          monitorQuantity === 2
            ? index === 0
              ? "left-[39%]"
              : "left-[61%]"
            : isStudioDesk
              ? "left-[50.5%]"
              : "left-[51.5%]";

        return (
          <span key={index} aria-hidden="true">
            <span
              className={`absolute top-[18%] h-[23%] ${monitorWidth} ${monitorPosition} rounded-lg border-[5px] border-[#263330] bg-[#bdd6cf] shadow-xl`}
            >
              <span className="absolute inset-1.5 rounded-sm bg-gradient-to-br from-white/50 to-transparent" />
            </span>
            <span
              className={`absolute top-[40%] h-[9%] w-[2%] ${standPosition} bg-[#263330]`}
            />
          </span>
        );
      })}

      {hasPlant && (
        <>
          <div className={`absolute top-[28%] h-[12%] w-[4%] rounded-full bg-[#466d50] ${isStudioDesk ? "left-[31%]" : "left-[19%]"}`} />
          <div className={`absolute top-[29%] h-[10%] w-[5%] -rotate-12 rounded-full bg-[#658966] ${isStudioDesk ? "left-[27%]" : "left-[15%]"}`} />
          <div className={`absolute top-[39%] h-[7%] w-[8%] rounded-b-lg bg-[#bf7751] ${isStudioDesk ? "left-[29%]" : "left-[17%]"}`} />
        </>
      )}

      {hasLamp && (
        <div className={`absolute top-[20%] h-[27%] w-[18%] drop-shadow-lg ${isStudioDesk ? "right-[14%]" : "right-[4%]"}`}>
          <div className="absolute bottom-0 left-[12%] h-[5%] w-[65%] rounded-full bg-[#273632]" />
          <div className="absolute bottom-[4%] left-[42%] h-[67%] w-[7%] origin-bottom -rotate-[20deg] rounded-full bg-[#273632]" />
          <div className="absolute left-[31%] top-[3%] h-[33%] w-[53%] -rotate-[10deg] rounded-t-full rounded-br-full bg-[#d79a45]" />
          <div className="absolute left-[42%] top-[27%] size-4 rounded-full bg-[#ffe6a3] shadow-[0_0_18px_8px_rgba(255,220,130,0.55)]" />
        </div>
      )}

      {isGamingChair ? (
        <>
          <div className="absolute left-[37%] top-[47%] h-[34%] w-[29%] rounded-t-[42%] bg-[#714B67] shadow-lg [clip-path:polygon(15%_0,85%_0,100%_25%,87%_100%,13%_100%,0_25%)]">
            <div className="absolute left-[19%] top-[12%] h-[13%] w-[62%] rounded-full bg-[#2d2930]" />
            <div className="absolute left-[15%] top-[34%] h-[48%] w-[12%] rounded-full bg-[#C08DAF]" />
            <div className="absolute right-[15%] top-[34%] h-[48%] w-[12%] rounded-full bg-[#C08DAF]" />
          </div>
          <div className="absolute left-[34%] top-[71%] h-[11%] w-[35%] rounded-lg bg-[#3A3039] shadow-md" />
          <div className="absolute left-[29%] top-[66%] h-[4%] w-[10%] rounded-full bg-[#303A38]" />
          <div className="absolute right-[27%] top-[66%] h-[4%] w-[10%] rounded-full bg-[#303A38]" />
        </>
      ) : isSoftChair ? (
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
