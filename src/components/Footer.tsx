import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-gray-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 px-6 py-8">
        
        {/* Left: Copyright */}
        <div className="text-sm">
          © {new Date().getFullYear()} WBS Group Project - Recipe Book. All rights reserved.
        </div>

        {/* Right: Team Links */}
        <div className="flex gap-12">
          {/* Amer */}
          <div className="flex flex-col items-center gap-2">
            <span className="font-semibold text-white">Amer</span>
            <div className="flex gap-4">
              <a
                href="https://github.com/Al-Amer"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/amer-almonajed/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Florian */}
          <div className="flex flex-col items-center gap-2">
            <span className="font-semibold text-white">Florian</span>
            <div className="flex gap-4">
              <a
                href="https://github.com/GruFRe"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/floriangrund/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Eduard */}
          <div className="flex flex-col items-center gap-2">
            <span className="font-semibold text-white">Eduard</span>
            <div className="flex gap-4">
              <a
                href="https://github.com/edubur"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/eduard-burgardt/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
