'use client'

import { MaterialViewer } from "../components/viewers/MaterialViewer";
import { PageHeader } from '../components/pages/PageHeader'


export default function Home() {
  return (
    <div className="flex-1 min-h-[calc(100vh-60px)] bg-blue-200">

      {/* <MaterialViewer /> */}
      <PageHeader  title="Olá, usuário!" subtitle="Vamos continuar seus estudos?" theresButton={false}/>


    </div>
  );
}
