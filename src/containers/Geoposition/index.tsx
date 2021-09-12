import React, { useEffect, useReducer, useRef } from 'react';


  const geoPositionReducer = (state: any, action: { type: string; payload: any; }) => {
    switch (action.type) {
      case "success":
        return {
          ...state,
          positions: action.payload,
        };
      case "error":
        return {
          ...state,
          error: action.payload,
        };
      default:
        throw new Error(`Action not Found!`);
    }
  }

  const useGeoPosition = () => {
   let clearPosition: number
    const [state, dispatch] = useReducer(geoPositionReducer, {
      positions: null,
      error: null,
    });

    useEffect(() => {
      if (!navigator.geolocation) {
        dispatch({ type: "error", payload: "Browser not supported yet!" });
      } else {
        clearPosition = navigator.geolocation.watchPosition(
          (position) => {
            dispatch({
              type: "success",
              payload: position.coords,
            });
          },
          (error) =>
            dispatch({
              type: "error",
              payload: error,
            })
        );
      }

      return () => {
        navigator.geolocation.clearWatch(clearPosition);
      };
    }, []);

    return state;
  }


export default useGeoPosition;