import { useSelector } from "react-redux"

import { Carousel, Typography } from "@material-tailwind/react"

function Body() {

    const { name } = useSelector((state) => state.user)
  return (
    <div>
    <Carousel className="rounded-xl">
      <div className="relative h-full w-full">
        <img
          src="https://images.unsplash.com/photo-1699006599430-4ba35169ff8b?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            {name && (
              <Typography
                variant="h1"
                color="white"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
              >
                welcome {name}
              </Typography>
            )}
          </div>
        </div>
      </div>
    </Carousel>
  </div>
  )
}

export default Body