import SlideIcon from './SlideIcon';
import FloodModelIcon from './FloodModelIcon';
import RainfallIcon from './RainfallIcon';
import WaterLevelIcon from './WaterLevelIcon';
import RailwayIcon from './RailwayIcon';
import FloodReportIcon from './FloodReportIcon';
import InfoIcon from './InfoIcon';
import LanguageIcon from './LanguageIcon';

const SidebarOpen = ({ onToggle }: { onToggle: () => void }) => (
  <aside className="w-[238px] h-screen bg-black/80 rounded-tr-[8px] rounded-br-[8px] backdrop-blur-[25px] flex flex-col justify-between pt-0 pb-0">
    {/* Top: SlideIcon */}
    <div className="flex justify-end items-center h-[72px] pr-6 w-full">
      <SlideIcon onClick={onToggle} />
    </div>
    {/* Middle */}
    <div className="flex flex-col items-start gap-[12px] pl-6">
      <FloodModelIcon open />
      <RainfallIcon open />
      <WaterLevelIcon open />
      <RailwayIcon open />
      <FloodReportIcon open />
    </div>
    {/* Bottom */}
    <div className="flex flex-col items-start gap-[20px] pl-6 mb-[48px]">
      <InfoIcon open />
      <LanguageIcon open />
    </div>
  </aside>
);

export default SidebarOpen;