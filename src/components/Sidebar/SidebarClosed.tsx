import SlideIcon from './SlideIcon';
import FloodModelIcon from './FloodModelIcon';
import RainfallIcon from './RainfallIcon';
import WaterLevelIcon from './WaterLevelIcon';
import RailwayIcon from './RailwayIcon';
import FloodReportIcon from './FloodReportIcon';
import InfoIcon from './InfoIcon';
import LanguageIcon from './LanguageIcon';

const SidebarClosed = ({ onToggle }: { onToggle: () => void }) => (
  <aside className="w-[80px] h-screen bg-black/80 rounded-tr-[8px] rounded-br-[8px] rounded-tl-none rounded-bl-none backdrop-blur-[25px] flex flex-col justify-between pt-0 pb-0">
    {/* Top: SlideIcon */}
    <div className="flex items-center justify-center h-[72px] w-full">
      <SlideIcon onClick={onToggle} />
    </div>
    {/* Middle */}
    <div className="flex flex-col items-center gap-[12px]">
      <RainfallIcon />
      <FloodModelIcon />
      <WaterLevelIcon />
      <RailwayIcon />
      <FloodReportIcon />
    </div>
    {/* Bottom */}
    <div className="flex flex-col items-center gap-[20px] mb-[48px]">
      <InfoIcon />
      <LanguageIcon />
    </div>
  </aside>
);

export default SidebarClosed;