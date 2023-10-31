import React, { useState } from 'react';
import { RoughNotation } from 'react-rough-notation'
import { Modal, ModalPortal, ModalOverlay, ModalClose, ModalTrigger, ModalContent, ModalHeader, ModalFooter, ModalTitle, ModalDescription } from "@/ModalPrimatives"
import PROJECTS from '@/data/projects'
import Image from 'next/image'

type Project = {
  name: string,
  image: any,
  tech: string[],
  description: string,
  github: string,
  demo: string,
}

export default function ProjectModal({color}:{color:string}) {
  type types = 'underline' | 'box' | 'circle' | 'highlight' | 'strike-through' | 'crossed-off' | 'bracket'
  const types: types[] = ["underline", "box", "circle"]
  const [show, setShow] = useState(false)
  const [type, setType] = useState<types>("circle")
  const [index, setIndex] = useState(0)

  const handleMouseOver = () => {
    setShow(true)
    setType(types[Math.floor(Math.random() * types.length)])
  }

  return (
    <Modal>
      <ModalTrigger>
        <span onMouseOver={() => handleMouseOver()} onMouseLeave={() => setShow(false)}>
          <RoughNotation type={type} animationDuration={1200} strokeWidth={4} show={show}>
            projects
          </RoughNotation>
        </span>
      </ModalTrigger>
      <ModalContent className="flex bg-white h-[min(720px,100vh)] min-w-0 max-w-[800px]">
        <div className="flex flex-col min-w-40 w-40 text-lg ">
          {PROJECTS.map((p,i) => {
            return (
              <button key={p.name} onClick={() => setIndex(i)} style={{ borderColor: index === i ? color : 'transparent' }}
                className="h-20 hover:bg-gray-100 border-8">
                {p.name}
              </button>
            )
          })}

        </div>
          <ProjectDetail project={PROJECTS[index]}/>
      </ModalContent>
    </Modal>
  )
}

const ProjectDetail = ({project}: {project: Project}) => {
  const {name, image, tech, description, github, demo} = project
  return (
    <div className="flex flex-col flex-grow max-w-[574px] h-full items-center text-md">
      <h1 className="mb-4">{name}</h1>
      <div className="max-w-[480px] h-full flex flex-col justify-between items-center">
        <div>
          <Image src={image} alt={name} className="w-full mb-4 rounded-lg"/>
          <div className="flex w-full justify-around flex-wrap mb-4 ">
            {tech.map(t => <span key={t} className="inline-flex items-center rounded-full border m-1 px-2 py-1 text-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">{t}</span>)}
          </div>
          <p className="justify-center items-center text-lg">{description}</p>
        </div>
        <div className="w-full flex flex-row">
          {(github && demo) && <div className="flex w-full justify-around text-lg">
            <a  href={github} target="_blank" rel="noopener noreferrer" 
              className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
              Github
            </a>
            <a href={demo} target="_blank" rel="noopener noreferrer" 
              className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
              Demo
            </a>
          </div>}
          {(github && !demo) && <div className="flex w-full justify-end text-lg">
            <a  href={github} target="_blank" rel="noopener noreferrer" 
              className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
              Github
            </a>
          </div>}
        </div>
      </div>
    </div>
  )
}