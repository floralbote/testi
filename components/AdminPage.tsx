
import React, { useState } from 'react';
import type { Anamnese, EssenciaFloral } from '../types';

const mockFlorais: EssenciaFloral[] = [
    { id: 1, nome: "Mimulus", descricao: "Para medos de origem conhecida.", indicacoes: "Timidez, gagueira, medo de doença, escuro, etc.", tipo: "Medo" },
    { id: 2, nome: "Aspen", descricao: "Para medos e ansiedades vagas, de origem desconhecida.", indicacoes: "Pressentimentos, apreensão, pânico inexplicável.", tipo: "Medo" },
    { id: 3, nome: "Rock Rose", descricao: "Para terror e pânico extremos.", indicacoes: "Acidentes, emergências, pesadelos.", tipo: "Medo" },
    { id: 4, nome: "Gorse", descricao: "Para desesperança e pessimismo extremos.", indicacoes: "Sentimento de que não há mais o que fazer.", tipo: "Incerteza" },
    { id: 5, nome: "Impatiens", descricao: "Para impaciência e irritabilidade.", indicacoes: "Tensão mental, pressa, querer tudo na hora.", tipo: "Solidão" },
    { id: 6, nome: "Centaury", descricao: "Para os que não sabem dizer não e são submissos.", indicacoes: "Vontade fraca, facilmente dominado pelos outros.", tipo: "Hipersensibilidade" },
];

const mockAnamneses: Anamnese[] = [
    {
        id: 1,
        data_criacao: "2024-07-28 10:30",
        sugestao_floral_ia: { floral: "Mimulus", motivo: "Usuário expressou medo específico de falar em público." },
        respostas_anamnese: [
            { id: '1', sender: 'bot', text: 'Olá! Como você está se sentindo?' },
            { id: '2', sender: 'user', text: 'Estou muito ansioso com uma apresentação no trabalho.' },
            { id: '3', sender: 'bot', text: 'Entendo. Pode me falar mais sobre esse sentimento?' },
            { id: '4', sender: 'user', text: 'Tenho muito medo de falar em público, de errar e ser julgado.' },
        ]
    },
    {
        id: 2,
        data_criacao: "2024-07-27 15:00",
        sugestao_floral_ia: { floral: "Impatiens", motivo: "Usuário demonstrou irritabilidade e pressa constantes." },
        respostas_anamnese: [
            { id: '1', sender: 'bot', text: 'Olá! Como posso ajudar?' },
            { id: '2', sender: 'user', text: 'Estou sempre sem paciência com as pessoas, tudo parece lento demais.' },
        ]
    }
];

const FloraisManager: React.FC = () => {
    // In a real app, this state would be managed via API calls
    const [florais, setFlorais] = useState<EssenciaFloral[]>(mockFlorais);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-emerald-700 mb-4">Gerenciar Essências Florais</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left table-auto">
                    <thead>
                        <tr className="bg-emerald-100 text-emerald-800">
                            <th className="p-3">Nome</th>
                            <th className="p-3">Tipo</th>
                            <th className="p-3">Indicações</th>
                            <th className="p-3">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {florais.map(floral => (
                            <tr key={floral.id} className="border-b hover:bg-gray-50">
                                <td className="p-3 font-medium">{floral.nome}</td>
                                <td className="p-3">{floral.tipo}</td>
                                <td className="p-3 text-sm text-gray-600">{floral.indicacoes}</td>
                                <td className="p-3">
                                    <button className="text-blue-500 hover:underline mr-2">Editar</button>
                                    <button className="text-red-500 hover:underline">Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             <button className="mt-4 bg-emerald-500 text-white font-bold py-2 px-4 rounded hover:bg-emerald-600 transition">
                Adicionar Nova Essência
            </button>
        </div>
    );
};

const AnamnesesViewer: React.FC = () => {
    const [anamneses] = useState<Anamnese[]>(mockAnamneses);
    const [selected, setSelected] = useState<Anamnese | null>(null);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-emerald-700 mb-4">Visualizar Anamneses</h3>
            {selected ? (
                <div>
                     <button onClick={() => setSelected(null)} className="mb-4 text-emerald-600 hover:underline">
                        &larr; Voltar para a lista
                    </button>
                    <h4 className="font-bold">Anamnese #{selected.id} - {selected.data_criacao}</h4>
                    <div className="mt-2 p-4 bg-gray-50 border rounded-lg max-h-64 overflow-y-auto">
                        {selected.respostas_anamnese.map(msg => (
                           <p key={msg.id} className={`${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                               <span className={`inline-block p-2 my-1 rounded-lg ${msg.sender === 'user' ? 'bg-emerald-100' : 'bg-gray-200'}`}>{msg.text}</span>
                           </p>
                        ))}
                    </div>
                    <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                        <h5 className="font-semibold text-emerald-800">Sugestão da IA:</h5>
                        <p><strong>Floral:</strong> {selected.sugestao_floral_ia.floral}</p>
                        <p><strong>Motivo:</strong> {selected.sugestao_floral_ia.motivo}</p>
                    </div>
                </div>
            ) : (
                <ul className="space-y-2">
                    {anamneses.map(item => (
                        <li key={item.id} onClick={() => setSelected(item)} className="p-3 bg-gray-100 rounded cursor-pointer hover:bg-emerald-100 transition">
                            Anamnese #{item.id} - {item.data_criacao}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};


const AdminPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'florais' | 'anamneses'>('florais');

    return (
        <div className="max-w-6xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold text-center text-emerald-800 font-lora mb-6">
                Painel Administrativo
            </h2>
            <div className="flex justify-center border-b mb-6">
                <button
                    onClick={() => setActiveTab('florais')}
                    className={`py-2 px-6 font-semibold ${activeTab === 'florais' ? 'border-b-2 border-emerald-500 text-emerald-600' : 'text-gray-500'}`}
                >
                    Essências Florais
                </button>
                <button
                    onClick={() => setActiveTab('anamneses')}
                    className={`py-2 px-6 font-semibold ${activeTab === 'anamneses' ? 'border-b-2 border-emerald-500 text-emerald-600' : 'text-gray-500'}`}
                >
                    Anamneses
                </button>
            </div>

            <div>
                {activeTab === 'florais' && <FloraisManager />}
                {activeTab === 'anamneses' && <AnamnesesViewer />}
            </div>
        </div>
    );
};

export default AdminPage;
