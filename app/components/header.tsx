"use client";

import Link from "next/link";
import {
  FileText,
  House,
  BadgeInfo,
  MapPin,
  Phone,
  UserPlus,
  CircleHelp,
  LogIn,
  Menu,
  X,
  Calculator,
  Activity,
  GraduationCap,
} from "lucide-react";
import { useState } from "react";

export default function Header() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
        >
          <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <MapPin className="text-black" size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight text-white group-hover:text-emerald-400 transition-all">
              Finder
            </h1>

            <p className="text-xs text-zinc-400">
              Consulta inteligente
            </p>
          </div>
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden md:flex items-center gap-3">

          <Link
            href="/pages/contact"
            className="flex items-center gap-3 px-5 py-4 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <Phone size={18} />
            Contato
          </Link>

          <Link
            href="/pages/register"
            className="flex items-center gap-3 px-5 py-4 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <UserPlus size={18} />
            Cadastro
          </Link>

          <Link
            href="/pages/about"
            className="flex items-center gap-3 px-5 py-4 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <BadgeInfo size={18} />
            Sobre
          </Link>

          <Link
            href="/pages/help"
            className="flex items-center gap-3 px-5 py-4 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <CircleHelp size={18} />
            Ajuda
          </Link>

          {/* MENU DROPDOWN */}
          <div className="relative group">
            <button className="ml-2 flex items-center gap-2 bg-linear-to-r from-emerald-400 to-cyan-500 hover:scale-105 transition-all duration-300 text-black font-semibold px-5 py-2 rounded-2xl shadow-lg">
              <LogIn size={18} />
              Menu
            </button>

            <div className="
              absolute right-0 top-full mt-2 w-60
            bg-zinc-900/95 backdrop-blur-xl
              border border-zinc-700
              rounded-2xl shadow-2xl
              opacity-0 invisible
              translate-y-2
              group-hover:opacity-100
              group-hover:visible
              group-hover:translate-y-0
              transition-all duration-300
              overflow-hidden">
              <Link
                href="/pages/cnpj-consulta"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-5 py-4 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <FileText size={18} />
                Consulta CNPJ
              </Link>

              <Link
                href="/pages/calculadora"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-5 py-4 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <Calculator size={18} />
                Calculadora
              </Link>

              <Link
                href="/pages/calcula-imc"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-5 py-4 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <Activity size={18} />
                Calcular IMC
              </Link>

              <Link
                href="/pages/calcula-media"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-5 py-4 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <GraduationCap size={18} />
                Calcular Média
              </Link>


              <div className="border-t border-zinc-700" />

              <Link
                href="/pages/login"
                className="flex items-center gap-3 px-5 py-4 text-emerald-400 hover:bg-zinc-800 transition-colors font-medium"
              >
                <LogIn size={18} />
                Fazer Login
              </Link>
            </div>

          </div>

        </nav>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-11 h-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/90 backdrop-blur-xl">
          <nav className="flex flex-col p-4 gap-2">

            {/* Options de pesquisa suspensa */}
            {/* MENU DROPDOWN */}
            <div className="relative group">
              <button className="ml-2 flex items-center gap-2 bg-linear-to-r from-emerald-400 to-cyan-500 hover:scale-105 transition-all duration-300 text-black font-semibold px-5 py-2 rounded-2xl shadow-lg">
                <House size={18} />
                Menu
              </button>

              <div className="
              absolute right-0 top-full mt-2 w-60
            bg-zinc-900/95 backdrop-blur-xl
              border border-zinc-700
              rounded-2xl shadow-2xl
              opacity-0 invisible
              translate-y-2
              group-hover:opacity-100
              group-hover:visible
              group-hover:translate-y-0
              transition-all duration-300
              overflow-hidden">
                <Link
                  href="/pages/cnpj-consulta"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-5 py-4 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  <FileText size={18} />
                  Consulta CNPJ
                </Link>

                <Link
                  href="/pages/calculadora"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-5 py-4 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  <Calculator size={18} />
                  Calculadora
                </Link>

                <Link
                  href="/pages/calcula-imc"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-5 py-4 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  <Activity size={18} />
                  Calcular IMC
                </Link>

                <Link
                  href="/pages/calcula-media"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-5 py-4 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  <GraduationCap size={18} />
                  Calcular Média
                </Link>

                {/* <Link
                href="/pages/register"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-5 py-4 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <UserPlus size={18} />
                Cadastro
              </Link>

              <Link
                href="/pages/help"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-5 py-4 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <CircleHelp size={18} />
                Ajuda
              </Link> */}

                <div className="border-t border-zinc-700" />

                <Link
                  href="/pages/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-5 py-4 text-emerald-400 hover:bg-zinc-800 transition-colors font-medium"
                >
                  <LogIn size={18} />
                  Fazer Login
                </Link>
              </div>

            </div>

            {/* ******** */}
            {/* Menu Mobile - opções adicionais */}
            <div className="border-t border-white/10 my-2" />

            <Link
              href="/pages/contact"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-300 hover:bg-white/10"
            >
              <Phone size={18} />
              Contato
            </Link>

            <Link
              href="/pages/register"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-300 hover:bg-white/10"
            >
              <UserPlus size={18} />
              Cadastro
            </Link>

            <Link
              href="/pages/about"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-300 hover:bg-white/10"
            >
              <BadgeInfo size={18} />
              Sobre
            </Link>

            <Link
              href="/pages/help"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-300 hover:bg-white/10"
            >
              <CircleHelp size={18} />
              Ajuda
            </Link>

          </nav>
        </div>
      )}
    </header>
  );
}


/**
 * HEADER PARA A PÁGINA CONSULTA DE CNPJ
 */
export function HeaderConsulta() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
        >
          <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <MapPin className="text-black" size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight text-white group-hover:text-emerald-400 transition-all">
              Finder
            </h1>

            <p className="text-xs text-zinc-400">
              Consulta inteligente
            </p>
          </div>
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden md:flex items-center gap-3">

          <Link
            href="/pages/contact"
            className="flex items-center gap-3 px-5 py-4 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <Phone size={18} />
            Contato
          </Link>

          <Link
            href="/pages/register"
            className="flex items-center gap-3 px-5 py-4 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <UserPlus size={18} />
            Cadastro
          </Link>

          <Link
            href="/pages/about"
            className="flex items-center gap-3 px-5 py-4 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <BadgeInfo size={18} />
            Sobre
          </Link>

          <Link
            href="/pages/help"
            className="flex items-center gap-3 px-5 py-4 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <CircleHelp size={18} />
            Ajuda
          </Link>

          {/* MENU DROPDOWN */}
          <div className="relative group">
            <button className="ml-2 flex items-center gap-2 bg-linear-to-r from-emerald-400 to-cyan-500 hover:scale-105 transition-all duration-300 text-black font-semibold px-5 py-2 rounded-2xl shadow-lg">
              <LogIn size={18} />
              Menu
            </button>

            <div className="
              absolute right-0 top-full mt-2 w-60
            bg-zinc-900/95 backdrop-blur-xl
              border border-zinc-700
              rounded-2xl shadow-2xl
              opacity-0 invisible
              translate-y-2
              group-hover:opacity-100
              group-hover:visible
              group-hover:translate-y-0
              transition-all duration-300
              overflow-hidden">

              <Link
                href="/"
                className="flex items-center gap-3 px-5 py-4 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <House size={18} />
                Home
              </Link>

              <div className="border-t border-zinc-700" />

              <Link
                href="/pages/login"
                className="flex items-center gap-3 px-5 py-4 text-emerald-400 hover:bg-zinc-800 transition-colors font-medium"
              >
                <LogIn size={18} />
                Fazer Login
              </Link>
            </div>

          </div>

        </nav>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-11 h-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/90 backdrop-blur-xl">
          <nav className="flex flex-col p-4 gap-2">

            {/* Options de pesquisa suspensa */}
            {/* MENU DROPDOWN */}
            <div className="relative group">
              <button className="ml-2 flex items-center gap-2 bg-linear-to-r from-emerald-400 to-cyan-500 hover:scale-105 transition-all duration-300 text-black font-semibold px-5 py-2 rounded-2xl shadow-lg">
                <House size={18} />
                Menu
              </button>

              <div className="
              absolute right-0 top-full mt-2 w-60
            bg-zinc-900/95 backdrop-blur-xl
              border border-zinc-700
              rounded-2xl shadow-2xl
              opacity-0 invisible
              translate-y-2
              group-hover:opacity-100
              group-hover:visible
              group-hover:translate-y-0
              transition-all duration-300
              overflow-hidden">

                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-5 py-4 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  <House size={18} />
                  Home
                </Link>

                <div className="border-t border-zinc-700" />

                <Link
                  href="/pages/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-5 py-4 text-emerald-400 hover:bg-zinc-800 transition-colors font-medium"
                >
                  <LogIn size={18} />
                  Fazer Login
                </Link>
              </div>

            </div>

            {/* ******** */}
            {/* Menu Mobile - opções adicionais */}
            <div className="border-t border-white/10 my-2" />

            <Link
              href="/pages/contact"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-300 hover:bg-white/10"
            >
              <Phone size={18} />
              Contato
            </Link>

            <Link
              href="/pages/register"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-300 hover:bg-white/10"
            >
              <UserPlus size={18} />
              Cadastro
            </Link>

            <Link
              href="/pages/about"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-300 hover:bg-white/10"
            >
              <BadgeInfo size={18} />
              Sobre
            </Link>

            <Link
              href="/pages/help"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-300 hover:bg-white/10"
            >
              <CircleHelp size={18} />
              Ajuda
            </Link>

          </nav>
        </div>
      )}
    </header>
  );
}




/**
 * HEADER PARA A PÁGINA ABOUT
 */
export function HeaderAbout() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
        >
          <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <MapPin className="text-black" size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight text-white group-hover:text-purple-400 transition-all">
              About
            </h1>

            <p className="text-xs text-zinc-400">
              Conheça nossa plataforma
            </p>
          </div>
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden md:flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-3 px-5 py-4 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <House size={18} />
            Home
          </Link>

          <Link
            href="/pages/contact"
            className="flex items-center gap-3 px-5 py-4 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <Phone size={18} />
            Contato
          </Link>

          <Link href="/pages/saiba-mais" className="ml-2 bg-linear-to-r from-purple-400 to-pink-500 hover:scale-105 transition-all duration-300 text-black font-semibold px-5 py-2 rounded-2xl shadow-lg">
            Saiba Mais
          </Link>
        </nav>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-11 h-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}