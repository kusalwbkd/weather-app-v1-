import React from 'react'
import { AlertTriangle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Button } from './ui/button';
const Error = ({errorText,fn,msg,Icon}:any) => {
  return (
    <Alert variant="destructive">
    <AlertTriangle className="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription className="flex flex-col gap-4">
      <p>{errorText}</p>
      <Button variant="outline" onClick={fn} className="w-fit">
        {Icon}
       {msg}
      </Button>
    </AlertDescription>
  </Alert>
  )
}

export default Error