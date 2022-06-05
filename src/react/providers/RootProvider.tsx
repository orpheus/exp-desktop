import React, { Suspense, ReactElement } from 'react'


const Providers: IProviders = []

const AllProviders = ({ Providers, children }: AllProvidersProps) => {
  const Provider = Providers.shift()
  if (!Provider) return children
  return <Provider>
    {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
    {AllProviders({ Providers, children })}
  </ Provider>
}

export default function RootProvider ({ children }: RootProviderProps) {
  return <Suspense fallback={null}>
    {AllProviders({ Providers, children })}
  </ Suspense>
}

type IProvider = ({ children }: ProviderProps) => JSX.Element
type IProviders = IProvider[]

interface ProviderProps {
  children: ReactElement | ReactElement[]
}

interface AllProvidersProps {
  Providers: IProviders
  children: ReactElement | ReactElement[]
}

interface RootProviderProps {
  children: ReactElement | ReactElement[]
}
