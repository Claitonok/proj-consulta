"use client";

import { useState } from "react";
import { HeaderConsulta } from "@/app/components/header";
import { Building2, Search, X } from "lucide-react";
import { toast } from "sonner";

interface CompanyData {
    nome: string;
    fantasia: string;
    cnpj: string;
    cnae_fiscal: string;
    cnae_fiscal_descricao: string;
    natureza_juridica: string;
    codigo_natureza_juridica: string | number;
    atividade_principal: string;
    situacao: string;
    telefone: string;
    email: string;
    municipio: string;
    uf: string;
    numero: string;
    logradouro: string;
    bairro: string;
}

export default function ConsultaCnpj() {
    const [cnpj, setCnpj] = useState("");
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [company, setCompany] = useState<CompanyData | null>(null);

    const formatCnpj = (value: string) => {
        value = value.replace(/\D/g, "");

        value = value.replace(
            /^(\d{2})(\d)/,
            "$1.$2"
        );

        value = value.replace(
            /^(\d{2})\.(\d{3})(\d)/,
            "$1.$2.$3"
        );

        value = value.replace(
            /\.(\d{3})(\d)/,
            ".$1/$2"
        );

        value = value.replace(
            /(\d{4})(\d)/,
            "$1-$2"
        );

        return value.slice(0, 18);
    };

    async function handleSubmit(e: any) {
        e.preventDefault();

        if (!cnpj) {
            toast.error("Informe um CNPJ");
            return;
        }

        try {
            setLoading(true);

            const cleanCnpj =
                cnpj.replace(/\D/g, "");


            //Exemplo usando BrasilAPI:

            const response = await fetch(
                `https://brasilapi.com.br/api/cnpj/v1/${cleanCnpj}`
            );

            if (!response.ok) {
                throw new Error("CNPJ não encontrado");
            }

            const data = await response.json();

            setCompany({
                nome: data.razao_social,
                fantasia: data.nome_fantasia,
                cnpj: formatCnpjDisplay(data.cnpj),
                cnae_fiscal: data.cnae_fiscal || "Não informado",
                cnae_fiscal_descricao: data.cnae_fiscal_descricao || "Não informado",
                atividade_principal: data.atividade_principal || "Não informado",
                natureza_juridica: data.natureza_juridica || "Não informado",
                codigo_natureza_juridica: formatCodigoNaturezaJuridica(data.codigo_natureza_juridica || "Não informado"),
                situacao: data.descricao_situacao_cadastral,
                telefone: formatTelefone(data.ddd_telefone_1),
                email: data.email || "Não informado",
                municipio: data.municipio,
                uf: data.uf,
                numero: data.numero || "Não informado",
                logradouro: data.logradouro || "Não informado",
                bairro: data.bairro || "Não informado",
            });


            // Dados fictícios para layout
            //   setCompany({
            //     nome:
            //       "Empresa Exemplo Tecnologia LTDA",
            //     fantasia: "CEP Finder",
            //     cnpj,
            //     situacao: "ATIVA",
            //     telefone: "(11) 99999-9999",
            //     email: "contato@cepfinder.com",
            //     municipio: "São Paulo",
            //     uf: "SP",
            //   });

            setShowModal(true);

            toast.success(
                "CNPJ consultado com sucesso!"
            );
        } catch {
            toast.error(
                "Erro ao consultar CNPJ"
            );
        } finally {
            setLoading(false);
        }
    }

    const formatCnpjDisplay = (cnpj: string) => {
        if (!cnpj || cnpj === "Não informado") {
            return cnpj;
        }
        return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    };

    const formatCodigoNaturezaJuridica = (codigo: string | number) => {
        if (!codigo || codigo === "Não informado") {
            return codigo;
        }
        return String(codigo).replace(/^(\d{3})(\d)$/, "$1-$2");
    };

    const formatTelefone = (telefone: string) => {
        if (!telefone || telefone === "Não informado") {
            return telefone;
        }

        return telefone.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-zinc-900 via-black to-zinc-800 text-white">
            <HeaderConsulta />

            <main className="flex items-center justify-center px-6 py-16">
                <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-4xl p-10 shadow-2xl">

                    <div className="text-center mb-8">
                        <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-linear-to-r from-emerald-400 to-cyan-500 flex items-center justify-center">
                            <Building2
                                size={38}
                                className="text-black"
                            />
                        </div>

                        <h1 className="text-4xl font-black">
                            Consulta CNPJ
                        </h1>

                        <p className="text-zinc-400 mt-3">
                            Consulte informações de
                            empresas em segundos.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <input
                            type="text"
                            value={cnpj}
                            onChange={(e) => setCnpj(formatCnpj(e.target.value))}
                            placeholder="00.000.000/0000-00"
                            className="w-full h-14 rounded-2xl bg-zinc-800 border border-zinc-700 px-5 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 rounded-2xl bg-linear-to-r from-emerald-400 to-cyan-500 text-black font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                        >
                            <Search size={20} />

                            {loading
                                ? "Consultando..."
                                : "Consultar CNPJ"}
                        </button>
                    </form>
                </div>
            </main>

            {/* Modal */}
            {showModal && company && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center p-4 z-50">

                    <div className="bg-zinc-900 border border-zinc-700 rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl">

                        {/* HEADER */}
                        <div className="flex justify-between items-center p-6 border-b border-zinc-800 sticky top-0 bg-zinc-900 z-10">
                            <div>
                                <h2 className="text-2xl font-bold">
                                    Dados da Empresa
                                </h2>

                                <p className="text-zinc-400 text-sm">
                                    Informações obtidas através da consulta do CNPJ
                                </p>
                            </div>

                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 rounded-xl hover:bg-zinc-800 transition-colors"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        {/* CONTENT */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-90px)]">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <InfoCard
                                    title="Razão Social"
                                    value={company.nome}
                                />

                                <InfoCard
                                    title="Nome Fantasia"
                                    value={company.fantasia}
                                />

                                <InfoCard
                                    title="CNPJ"
                                    value={company.cnpj}
                                />

                                <InfoCard
                                    title="Situação"
                                    value={company.situacao}
                                />

                                <InfoCard
                                    title="Telefone"
                                    value={company.telefone}
                                />

                                <InfoCard
                                    title="E-mail"
                                    value={company.email}
                                />

                                <InfoCard
                                    title="Cidade"
                                    value={`${company.municipio}/${company.uf}`}
                                />

                                <InfoCard
                                    title="Bairro"
                                    value={company.bairro}
                                />

                                <InfoCard
                                    title="Logradouro"
                                    value={company.logradouro}
                                />

                                <InfoCard
                                    title="Numero"
                                    value={company.numero}
                                />

                                <InfoCard
                                    title="Natureza Jurídica"
                                    value={`${company.codigo_natureza_juridica} - ${company.natureza_juridica}`}
                                />

                            </div>

                            {/* CAMPOS GRANDES */}
                            <div className="mt-4 space-y-4">

                                <InfoCard
                                    title="Atividade Principal"
                                    value={`${company.cnae_fiscal} - ${company.cnae_fiscal_descricao}`}
                                />

                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

function InfoCard({
    title,
    value,
}: {
    title: string;
    value: string;
}) {
    return (
        <div className="bg-zinc-800/80 border border-zinc-700 rounded-2xl p-4 hover:border-emerald-500/30 transition-colors">
            <p className="text-zinc-400 text-xs uppercase tracking-wider mb-2">
                {title}
            </p>

            <p className="font-medium wrap-break-word text-zinc-100">
                {value || "Não informado"}
            </p>
        </div>
    );
}