const CenterWrap = ({className, children }: { className: string, children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {className ? 
        (<div className="flex-col">
        {children}
      </div>)
      : <>{children}</>
      }
    </div>
  )
}

export default CenterWrap