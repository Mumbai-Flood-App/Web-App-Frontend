'use client';
import Image from 'next/image';
import Link from 'next/link';

// Team member data
const TEAM_MEMBERS = [
  {
    name: 'Prof. Subimal Ghosh',
    link: 'https://www.linkedin.com/in/subimal-ghosh-640b46a/',
  },
  {
    name: 'Prof. Raghu Murtugudde',
    link: 'https://www.linkedin.com/in/raghu-murtugudde-b1438a3b/',
  },
  {
    name: 'Dr. Aniket Navalkar',
    link: 'https://www.linkedin.com/in/aniket-navalkar-4805bb3a/',
  },
  {
    name: 'Dr. Mayank Gupta',
    link: 'https://www.linkedin.com/in/mayank-gupta-b32a3225/',
  },
  {
    name: 'Dr. Sanghita Basu',
    link: 'https://www.linkedin.com/in/dr-sanghita-basu-73190b60/',
  },
  {
    name: 'Archismita Banerjee',
    link: 'https://www.facebook.com/archismita.banerjee.5',
  },
  {
    name: 'Puja Tripathy',
    link: 'https://www.linkedin.com/in/puja-tripathy-82a324173/',
  },
  {
    name: 'Sheeba Sekharan',
    link: 'https://www.linkedin.com/in/sheeba-sekharan/',
  },
  {
    name: 'Dr. Shrabani Tripathy',
    link: 'https://www.linkedin.com/in/shrabani-tripathy-37979310b/',
  },
  {
    name: 'Sautrik Chaudhuri',
    link: 'https://www.linkedin.com/in/sautrik-chaudhuri-094064141/',
  },
  {
    name: 'Dr. Jisha Joseph',
    link: 'https://www.linkedin.com/in/jisha-joseph-33a5b7aa/',
  },
  {
    name: 'Deepak Silaych',
    link: 'https://www.linkedin.com/in/deepaksilaych/',
  },
  {
    name: 'Gulshan Kumar',
    link: 'https://www.linkedin.com/in/gulshan-kumar-69b54b25b/',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto h-screen">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-900 text-center mb-8">About the Mumbai Flood Experiment</h1>
        {/* About Section */}
        <section className="mb-8 sm:mb-16">
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 text-gray-700 px-4 sm:px-0">
            <p className="text-base sm:text-lg">
              We are a team of students, faculty, and staff from the Interdisciplinary Programme in
              Climate Studies (IDPCS) at IIT Bombay, developing an experimental rainfall forecasting
              and flood monitoring system to help Mumbai adapt to its persistent monsoon flooding.
            </p>

            <p className="text-base sm:text-lg">
              By disseminating near-real-time rainfall and waterlogging information through our
              dedicated website portal{' '}
              <Link
                href="https://www.mumbaiflood.in/"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                mumbaiflood.in
              </Link>{' '}
              and the MUMBAI FLOOD APP, we aim to provide Mumbaikars with timely and accurate
              rainfall forecast and flood updates to help them plan their rain days ahead.
            </p>

            <p className="text-base sm:text-lg">
              This is an initiative by HDFC-ERGO IIT Bombay (HE-IITB) Innovation Lab, with funding
              from HDFC ERGO, in collaboration with the MCGM Centre for Municipal Capacity Building
              and Research (MCMCR).
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-8 sm:mb-16 bg-gray-50 rounded-xl p-4 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 text-center mb-6 sm:mb-8">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg sm:text-xl font-semibold text-blue-600 mb-2 sm:mb-3">
                Experimental Rainfall Forecasts
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                Hyperlocal rainfall forecasts derived from global forecasting systems (GFS) and
                enhanced through AI/ML modeling. View hourly observed values and daily forecasts for
                the next three days.
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg sm:text-xl font-semibold text-blue-600 mb-2 sm:mb-3">
                LIVE Water-level Monitoring
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                Nine water-level monitoring stations installed at flood-prone hotspots across Mumbai
                provide near-real-time waterlogging updates during the monsoon.
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg sm:text-xl font-semibold text-blue-600 mb-2 sm:mb-3">
                Rail Information
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                Access near-real-time flooding information for various local rail stations in Mumbai
                to plan your commute better.
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg sm:text-xl font-semibold text-blue-600 mb-2 sm:mb-3">
                Smart Tweet Analysis
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                Machine Learning based sentiment analysis of flood-related tweets helps gauge public
                monsoon sentiment and approximate flood locations.
              </p>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 text-center mb-6 sm:mb-8">
            Our Partners
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center text-gray-700">
                Academic Partners
              </h3>
              <div className="flex justify-center items-center gap-4">
                <Image
                  src="/images/iitb.svg"
                  alt="IIT Bombay"
                  width={80}
                  height={80}
                  className="object-contain hover:scale-105 transition-transform"
                />
                <Image
                  src="/images/cs.png"
                  alt="Climate Studies"
                  width={64}
                  height={64}
                  className="object-contain hover:scale-105 transition-transform"
                />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center text-gray-700">
                Sponsoring Partner
              </h3>
              <div className="flex justify-center items-center gap-4">
                <Image
                  src="/images/hebg.png"
                  alt="HDFC ERGO"
                  width={96}
                  height={96}
                  className="object-contain hover:scale-105 transition-transform"
                />
                <Image
                  src="/images/hdfc.png"
                  alt="HDFC"
                  width={64}
                  height={64}
                  className="object-contain hover:scale-105 transition-transform"
                />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center text-gray-700">
                Project Partner
              </h3>
              <div className="flex justify-center items-center">
                <Image
                  src="/images/mcmbg.png"
                  alt="MCGM Center"
                  width={80}
                  height={80}
                  className="object-contain hover:scale-105 transition-transform"
                />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center text-gray-700">
                Data Source
              </h3>
              <div className="flex justify-center items-center">
                <Image
                  src="/images/bmc.png"
                  alt="BMC"
                  width={80}
                  height={80}
                  className="object-contain hover:scale-105 transition-transform"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Acknowledgements Section */}
        <section className="mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 text-center mb-6 sm:mb-8">
            Acknowledgements
          </h2>
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 text-gray-700 px-4 sm:px-0">
            <p className="text-base sm:text-lg">
              Installation of the water-level monitoring sensors would not have been possible
              without the timely assistance, guidance, and wholehearted support from the
              below-mentioned personnel:
            </p>
            <ol className="list-decimal space-y-3 sm:space-y-4 pl-6 text-sm sm:text-base">
              <li>
                Ward officers, Executive Engineers, Assistant Engineers, and Junior Engineers of the
                H West, F South, F North, E and L Wards for granting permissions and helping in
                identifying flooding hotspots;
              </li>
              <li>
                Faculty at the Department of Geography, University of Mumbai for their collaborative
                efforts in the flood monitoring experiment. We thank the VC, Registrar and the
                Campus Development Unit of the University of Mumbai for granting space and
                electricity for installing the canal sensor on MU campus;
              </li>
              <li>
                Executive Engineer, Assistant Engineer, and other staff at the Water Works
                Department, Municipal Corporation of Greater Mumbai (MCGM), Powai for allowing us to
                use their premises for installing canal sensor on Mithi River;
              </li>
              <li>
                Divisional Engineer Street Lights Maintenance (DESLM), Brihanmumbai Electricity
                Supply and Transport Undertaking (BEST) for allowing installation of road sensors on
                BEST poles;
              </li>
              <li>
                Chief Engineer and Officials of Customer Care, Electric Supply, BEST for prompt
                response to electrical connection requests;
              </li>
              <li>
                Secretary, Chairman and Residents of Mandarpan Coop Housing society, RA Kidwai Road
                Wadala for their cooperation and no objection to installing electric meter in their
                premises;
              </li>
              <li>
                Mr Omkar Sunil Chavan and the residents of his compound for their cooperation and
                support for installing canal sensor at Andheri Subway;
              </li>
              <li>
                Officials and Staff at Adani Electricity for prompt response to application request
                for electric meters.
              </li>
            </ol>
          </div>
        </section>

        {/* App Download Section */}
        <section className="mb-8 sm:mb-16 bg-gray-50 rounded-xl p-4 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 text-center mb-6 sm:mb-8">
            Download Our App
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
            <div className="text-center sm:text-left space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                Get the Mumbai Flood App
              </h3>
              <p className="text-sm sm:text-base text-gray-600 max-w-md">
                Stay updated with real-time flood alerts and rainfall forecasts. Download our app to
                access all features on the go.
              </p>
            </div>
            <div className="w-36 h-36 sm:w-48 sm:h-48 flex items-center justify-center">
              <Image
                src="/images/qrcn1.png"
                alt="App QR Code"
                width={192}
                height={192}
                className="w-full h-full object-contain hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 text-center mb-6 sm:mb-8">
            IIT Bombay Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {TEAM_MEMBERS.map((member, index) => (
              <Link
                key={index}
                href={member.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 sm:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow hover:bg-gray-50"
              >
                <span className="text-sm sm:text-base text-gray-700 hover:text-blue-600 transition-colors">
                  {member.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
