"use client"
import React, { useState, useEffect } from 'react';
import { COLORS, TECHS, LOVES } from '@/data'
import { RoughNotation } from 'react-rough-notation'
import { Modal, ModalPortal, ModalOverlay, ModalClose, ModalTrigger, ModalContent, ModalHeader, ModalFooter, ModalTitle, ModalDescription } from "@/ModalPrimatives"

export default function Home() {
  const [colorIndex, setColorIndex] = useState(0)
  const [techIndex, setTechIndex] = useState(0)
  const [loveIndex, setLoveIndex] = useState(0)
  const [lastTime, setLastTime] = useState(new Date().valueOf())

  const colorChange = () => {
    let curTime = new Date().valueOf()
    if (curTime - 250 >= lastTime) {
      setColorIndex(prevColor => (prevColor + 1) % COLORS.length)
      setTechIndex(prevTech => (prevTech + 1) % TECHS.length)
      setLoveIndex(prevLove => (prevLove + 1) % LOVES.length)
      setLastTime(curTime)
    }
  }

  return (
    <main className="flex justify-center min-h-screen max-h-screen min-w-screen max-w-screen text-white cursor-custom overflow-hidden" style={{ backgroundColor: COLORS[colorIndex] }}onMouseMove={colorChange}>
      <div className="flex flex-col items-center w-[80%] max-w-[1400px] my-16 lg:my-20">
        <h1 className="w-full text-[12vw] sm:text-[9vw] lg:text-[8vh] 2xl:text-[8.33vh] mb-12 lg:mb-20">hi i'm jake!</h1>
        <div className="w-full mb-12 lg:mb-20 leading-snug">
          I'm a full stack dev <span role="img" aria-label="man technologist">👨‍💻 </span>
          building fun & functional experiences using modern technologies including: { TECHS[techIndex] }
        </div>
        <div className="w-full mb-12 lg:mb-20 leading-snug">
          In my free time I'm making a horde-survival game staring a goblin <span role="img" aria-label="frog emoji">🐸 </span> hero & an evil wizard 
          <span role="img" aria-label="Man Mage emoji">🧙‍♂️</span>
        </div>
        <div className="w-full mb-12 lg:mb-20">
          {LOVES[loveIndex]}
        </div>
        <div className="w-full flex flex-col lg:hidden">
          <HoverLine text="Check out my Github " href="https://github.com/JakeRoyRandall" label="robot" emoji="🤖"/>
          <HoverLine text="Connect on LinkedIn " href="https://www.linkedin.com/in/jake-r-randall" label="handshake" emoji="🤝"/>
          <HoverLine text="Download my Resume " href="./JakeRandallResume.pdf" label="clipboard" emoji="📋"/>
          <HoverLine text="Get In Touch! " href="mailto:hello@jakerandall.me?subject=Website%20Contact" label="envelope" emoji="💌"/>
        </div>
        <div className="hidden lg:flex flex-row justify-between w-full">
          <ProjectModal />
          <HoverText name="github" href="https://github.com/JakeRoyRandall" />
          <HoverText name="linkedIn" href="https://www.linkedin.com/in/jake-r-randall" />
          <HoverText name="resume" href="./JakeRandallResume.pdf" />
          <HoverText name="contact" href="mailto:hello@jakerandall.me?subject=Website%20Contact" />
        </div>
      </div>
    </main>
  )
}

const ProjectModal = () => {
  const [show, setShow] = useState(false)

  const handleMouseOver = () => {
    setShow(true)
  }

  return (
    <Modal>
      <ModalTrigger>
        <span onMouseOver={() => handleMouseOver()} onMouseLeave={() => setShow(false)}>
          <RoughNotation type={"box"} animationDuration={1200} strokeWidth={4} show={show}>
            projects
          </RoughNotation>
        </span>
      </ModalTrigger>
      <ModalContent className="bg-white sm:max-w-[425px]">
        <ModalHeader>
          <ModalTitle>Edit profile</ModalTitle>
          <ModalDescription>
            Make changes to your profile here. Click save when you're done.
          </ModalDescription>
        </ModalHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            {/* <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            /> */}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            {/* <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            /> */}
          </div>
        </div>
        <ModalFooter>
          <button type="submit">Save changes</button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const HoverText = ({name, href}: {name: string, href: string}) => {
  type types = 'underline' | 'box' | 'circle' | 'highlight' | 'strike-through' | 'crossed-off' | 'bracket'
  const types: types[] = ["underline", "box", "circle"]
  const [show, setShow] = useState(false)
  const [type, setType] = useState<types>("circle")

  const handleMouseOver = () => {
    setShow(true)
    setType(types[Math.floor(Math.random() * types.length)])
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="cursor-custom" onMouseOver={() => handleMouseOver()} onMouseLeave={() => setShow(false)}>
      <RoughNotation key={type} type={type} animationDuration={1200} strokeWidth={4} show={show}>
        { name }
      </RoughNotation>
    </a>
  )
}

type HoverLineProps = {text: string, href: string, label: string, emoji: string}
const HoverLine = ({text, href, label, emoji}: HoverLineProps) => {
  const [show, setShow] = useState(false)

  return (
    <div className="w-full mb-12" >
      <div className="w-max">
        <RoughNotation type={ "box" } animationDuration={1200} strokeWidth={4} show={ show }>
        <div onMouseOver={() => setShow(true)} onMouseLeave={() => setShow(false)}>
          <a className="cursor-custom" href={href} target="_blank" rel="noopener noreferrer">
            {text}<span role="img" aria-label={`${label} emoji`}>{emoji}</span>
          </a>
        </div>
        </RoughNotation>
      </div>
    </div>
  )
}