import React, { useEffect, useRef, useState } from 'react'
import Card from '../components/UI/Card'
import MetaDecorator from '../components/MetaDecorator'
import { validPathwaysEmail } from '../utils/emails'
import axios from 'axios'
import { ApiRoutes } from '../data/Routes'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import Tooltip from '../components/UI/Tooltip'

function Join() {
  const [status, setStatus] = useState({
    error: false,
    success: false,
    message: '',
    isUserError: false,
  })

  const [inProgress, setInProgress] = useState(false)

  const emailRef = useRef(null)

  const submit = async (event) => {
    // stop reload
    event.preventDefault()

    const email = emailRef.current.value
    const isValid = validPathwaysEmail(email)

    if (!isValid) {
      setStatus({
        error: true,
        success: false,
        message: 'Invalid Email',
        isUserError: true,
      })
      return
    }

    setInProgress(true)
    try {
      await axios.post(ApiRoutes.join, { email })
      setStatus({
        error: false,
        success: true,
        message: 'Email sent!',
        isUserError: false,
      })
    } catch (err) {
      console.log()
      setStatus({
        error: true,
        success: false,
        message:
          err.response?.data?.msg ||
          'There was an error processing the request!',
        isUserError: true,
      })
    }
    setInProgress(false)
  }

  return (
    <>
      <MetaDecorator description={'Join the PSN Hack Club!'} title={'Join'} />
      <Card
        className={'!w-80 !h-auto md:!w-[32rem] block !mx-auto !my-auto !p-6'}
      >
        <Tooltip tooltipText={'psnhackclub@gmail.com'} className={'-mb-6'}>
          <BsFillInfoCircleFill
            className={
              'block w-6 h-6 ml-auto hover:cursor-grab hover:text-gray-800 text-gray-400 duration-200'
            }
          />
        </Tooltip>

        <p
          className={
            'text-xl md:text-2xl font-extrabold leading-6 text-gray-800 !font-sans'
          }
        >
          Join with Email
        </p>

        {status.error && (
          <span className={`text-sm md:text-base text-red-500`}>
            <p>{status.message}</p>
            {!status.isUserError && (
              <p className={'-mt-1'}>Please try again later</p>
            )}
          </span>
        )}

        {status.success && (
          <span className={`text-sm md:text-base text-emerald-500`}>
            <p>{status.message}</p>
          </span>
        )}

        <form onSubmit={submit} className={'mt-1'}>
          <label className="text-sm md:text-base font-medium leading-none text-gray-800">
            School Email &nbsp;
            <a className={status.error ? 'text-red-500' : 'text-gray-400'}>
              (@pathways.in)
            </a>
          </label>
          <input
            ref={emailRef}
            role="input"
            type="email"
            className="bg-gray-200 border rounded focus:outline-none text-sm md:text-base leading-none text-gray-800 py-3 w-full pl-3 mt-2 ring-offset-2 false"
            defaultValue=""
          />

          <button
            disabled={inProgress || status.success}
            className={`inline-flex items-center justify-center mt-2 block px-6 py-3 text-sm md:text-lg transition-colors duration-300 rounded-lg shadow-md text-white w-full ${
              inProgress || status.success
                ? 'bg-gray-400 shadow-gray-400/30 hover:cursor-not-allowed'
                : 'bg-orange-500 hover:bg-red-500 shadow-red-400/30'
            }`}
          >
            {inProgress && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
            Send Email
          </button>
        </form>
      </Card>
    </>
  )
}

export default Join
