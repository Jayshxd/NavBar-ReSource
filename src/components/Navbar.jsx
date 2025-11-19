import React, { useState } from 'react';
// We'll use lucide-react for icons, a popular icon library
import { Bell, Search } from 'lucide-react';

/*
 * =================================================================
 * Navbar Component (components/Navbar.jsx)
 * =================================================================
 * NAYA LAYOUT (User's Idea):
 * 1. Tier 1: Centered Logo (Same)
 * 2. Tier 2: Centered Search Bar (NEW)
 * 3. Tier 3: Nav Links (Left) aur User Icons (Right) ek hi line me (NEW)
*/
function Navbar({ activeLink, setActiveLink }) {
    const [searchQuery, setSearchQuery] = useState('');
    const navLinks = ['Dashboard', 'Track', 'Assets', 'Employees'];

    return (
        // Full-width navbar, padding adjust ki gayi hai
        <div className="w-full border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 px-6 py-5 text-white shadow-lg azonix">

            {/* === TIER 1: CENTERED LOGO === */}
            <div className="mx-auto flex max-w-7xl items-center justify-center">
                <div className="flex-shrink-0">
                    <a
                        href="#"
                        className="text-blue-400 transition-colors duration-200 font-bold azonix text-3xl hover:text-blue-300"
                    >
                        Re-Source
                    </a>
                </div>
            </div>

            {/* ---!!!! USER'S GRADIENT SEPARATOR !!!!--- */}
            <div className="h-px my-5 w-full bg-gradient-to-r from-transparent via-slate-700/50 to-transparent"></div>

            {/* === TIER 2: CENTERED SEARCH BAR === */}
            <div className="mx-auto flex max-w-7xl items-center justify-center gap-4"> {/* Sirf justify-center */}
                {/* --- Search Bar (Chhota kar diya) --- */}
                {/* 'md:flex-1' hata diya hai taaki ye center me rahe */}
                {/* Yahaan 'md:max-w-sm' ko 'md:max-w-md' kar diya hai */}
                <div className="relative w-full md:w-auto md:max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={20} className="text-slate-500" />
          </span>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} /* BUG FIX: e.g.value -> e.target.value */
                        placeholder="Search"
                        className="w-full rounded-lg axis border-none bg-slate-800 py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {/* User icons ko yahaan se hata diya hai */}
            </div>

            {/* ---!!!! SUBTLE SEPARATOR (NEW) !!!!--- */}
            <div className="my-4 h-px w-full bg-slate-800"></div>


            {/* === TIER 3: NAV LINKS & USER ICONS === */}
            {/* Ab Nav aur Icons dono isi container me hain */}
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <nav>
                    <div className="overflow-x-auto pb-1">
                        <ul className="flex items-center space-x-2 whitespace-nowrap">
                            {navLinks.map((link, index) => (
                                <React.Fragment key={link}>
                                    {index > 0 && (
                                        <li className="flex items-center" aria-hidden="true">
                                            {/* Vertical separator */}
                                            <div className="h-4 w-px bg-slate-700"></div>
                                        </li>
                                    )}
                                    <li>
                                        <button
                                            onClick={() => setActiveLink(link)}
                                            className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200
                        ${
                                                activeLink === link
                                                    ? 'bg-slate-700 text-white'
                                                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                                            }
                      `}
                                        >
                                            {link}
                                        </button>
                                    </li>
                                </React.Fragment>
                            ))}
                        </ul>
                    </div>
                </nav>

                {/* --- User Icons (Yahaan move kar diye) --- */}
                <div className="flex flex-shrink-0 items-center space-x-4">
                    <button className="rounded-full p-1.5 text-slate-400 transition-colors duration-200 hover:bg-slate-800 hover:text-white">
                        <Bell size={20} />
                    </button>
                    <button className="overflow-hidden rounded-full transition-all duration-200 hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 hover:ring-offset-slate-900">
                        <img
                            src="https://placehold.co/32x32/E2E8F0/334155?text=U"
                            alt="User avatar"
                            className="h-8 w-8 object-cover"
                            onError={(e) => {
                                e.target.src =
                                    'https://placehold.co/32x32/E2E8F0/334155?text=E';
                            }}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;