import { useTheme } from "@/context/ThemeProvider";
import React from 'react'
import { Link } from "react-router-dom";
import CitySearch from "./CitySearch";
import ThemeToggle from "./ThemeToggle";

const Header = () => {

    return (
        <header className="sticky top-0 z-50  border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
            <div className="container mx-auto flex h-16 items-center justify-between px-8">
                <Link to={'/'} className=" text-5xl">
                    🌤️
                </Link>
                <div className="flex gap-4">
                    <CitySearch />
                    <ThemeToggle />
                </div>
            </div>


        </header>

    )
}

export default Header