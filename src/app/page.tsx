'use client'

import { MaterialViewer } from "../components/viewers/MaterialViewer";
import { PageHeader } from '../components/pages/PageHeader'
import { StudyItem } from "../components/studycard/StudyItem";
import { StudyType } from "../types/StudyType";


export default function Home() {


  const study: StudyType = {
    id: 'asdaf-dsfrgrg-dgrtg',
    title: 'Revisar Redacao',
    done: false,
    color_hex: '#292524',
    color_name: 'brown',
    date: '12 de Outubro de 2026',
    material: [
      { id: '`7f3c2a91-6d84-4b17-9e52-a8c71f0d3b46`', type: 'string', name: 'ola', url: 'https://codeshack.io/html-viewer/' }
    ]

  }

  return (
    <div className="flex-1 min-h-[calc(100vh-60px)] bg-blue-200">

      {/* <MaterialViewer /> */}
      <PageHeader title="Olá, usuário!" subtitle="Vamos continuar seus estudos?" theresButton={false} />

      <ul className="flex-1 flex flex-col">
       
      </ul>

    </div>
  );
}
