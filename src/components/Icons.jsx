// Icons.jsx
import React from 'react'

// Iconose sociales para el footer
export function RedesSociales () {
  return (
    <div className="flex justify-center space-x-6 mt-6 text-[#692904] text-2xl">
      <a
        href="https://www.instagram.com/ff.mates/?hl=es"
        className="hover:scale-110 transition"
        aria-label="Instagram"
      >
        <svg
          width="24px"
          height="24px"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#692904]"
        >
          <path
            d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M17.5 6.51L17.51 6.49889"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>

      <a
        href="https://wa.me/5493513662570"
        className="hover:scale-110 transition"
        aria-label="WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 32 32"
          className="text-[#692904] fill-current"
        >
          <path
            fillRule="evenodd"
            d="M 24.5 7.5 C 22.2 5.2 19.2 4 16 4 C 9.5 4 4.1 9.4 4.1 15.9 C 4.1 18 4.6 20.1 5.7 21.9 L 4 28.1 L 10.3 26.4 C 12.1 27.4 14 27.9 16 27.9 C 22.6 27.9 28 22.5 28 15.9 C 28 12.8 26.8 9.8 24.5 7.5 Z M 16 25.9 C 14.3 25.9 12.5 25.4 11 24.5 L 10.6 24.3 L 6.9 25.3 L 7.9 21.6 L 7.6 21.2 C 6.6 19.6 6.1 17.8 6.1 15.9 C 6.1 10.5 10.6 6 16.1 6 C 18.7 6 21.2 7.1 23.1 8.9 C 25 10.8 26 13.3 26 15.9 C 26 21.4 21.5 25.9 16 25.9 Z M 21.5 18.4 C 21.2 18.3 19.7 17.6 19.5 17.5 C 19.2 17.4 19 17.3 18.8 17.6 C 18.6 17.9 18 18.6 17.8 18.8 C 17.7 19 17.5 19 17.2 18.9 C 16.9 18.7 15.9 18.4 14.8 17.4 C 13.9 16.6 13.3 15.6 13.1 15.3 C 13 15 13.1 14.9 13.3 14.7 C 13.4 14.6 13.6 14.4 13.7 14.2 C 13.9 14 13.9 13.9 14 13.7 C 14.1 13.5 14.1 13.3 14 13.2 C 13.9 13 13.3 11.5 13.1 10.9 C 12.8 10.4 12.6 10.4 12.4 10.4 C 12.2 10.4 12 10.4 11.8 10.4 C 11.6 10.4 11.3 10.5 11 10.8 C 10.8 11.1 10 11.8 10 13.3 C 10 14.8 11.1 16.2 11.2 16.4 C 11.3 16.6 13.3 19.6 16.3 20.9 C 17 21.2 17.6 21.4 18 21.5 C 18.7 21.7 19.4 21.7 19.9 21.6 C 20.5 21.5 21.6 20.9 21.9 20.2 C 22.1 19.5 22.1 18.9 22.1 18.8 C 22 18.7 21.8 18.6 21.5 18.4 Z"
          />
        </svg>
      </a>

      <a
        href="https://www.instagram.com/ff.mates/?hl=es"
        className="hover:scale-110 transition"
        aria-label="Facebook"
      >
        <svg
          width="24px"
          height="24px"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#692904]"
        >
          <path
            d="M17 2H14C12.6739 2 11.4021 2.52678 10.4645 3.46447C9.52678 4.40215 9 5.67392 9 7V10H6V14H9V22H13V14H16L17 10H13V7C13 6.73478 13.1054 6.48043 13.2929 6.29289C13.4804 6.10536 13.7348 6 14 6H17V2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}



// carrito del producto
export function AddToCartIcon () {
    return (
      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' strokeWidth='1' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
        <path d='M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
        <path d='M17 17h-11v-14h-2' />
        <path d='M6 5l6 .429m7.138 6.573l-.143 1h-13' />
        <path d='M15 6h6m-3 -3v6' />
      </svg>
    )
  }

  export function Add({ size = 40, color = "#ffde45" }) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 256 256">
        <g fill={color} fillRule="nonzero">
          <g transform="scale(8.53333)">
            <path d="M15,3c-6.627,0 -12,5.373 -12,12c0,6.627 5.373,12 12,12c6.627,0 12,-5.373 12,-12c0,-6.627 -5.373,-12 -12,-12zM21,16h-5v5c0,0.553 -0.448,1 -1,1c-0.552,0 -1,-0.447 -1,-1v-5h-5c-0.552,0 -1,-0.447 -1,-1c0,-0.553 0.448,-1 1,-1h5v-5c0,-0.553 0.448,-1 1,-1c0.552,0 1,0.447 1,1v5h5c0.552,0 1,0.447 1,1c0,0.553 -0.448,1 -1,1z" />
          </g>
        </g>
      </svg>
    );
  }
  
  export function RemoveFromCartIcon () {
    return (
      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' strokeWidth='1' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
        <path d='M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
        <path d='M17 17h-11v-14h-2' />
        <path d='M6 5l8 .571m5.43 4.43l-.429 3h-13' />
        <path d='M17 3l4 4' />
        <path d='M21 3l-4 4' />
      </svg>
    )
  }
  
  export function ClearCartIcon () {
    return (
      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' strokeWidth='1' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
        <path d='M17 17a2 2 0 1 0 2 2' />
        <path d='M17 17h-11v-11' />
        <path d='M9.239 5.231l10.761 .769l-1 7h-2m-4 0h-7' />
        <path d='M3 3l18 18' />
      </svg>
    )
  }
  
  export function CartIcon () {
    return (
      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' strokeWidth='1' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
        <path d='M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
        <path d='M17 17h-11v-14h-2' />
        <path d='M6 5l14 1l-1 7h-13' />
      </svg>
    )
  }