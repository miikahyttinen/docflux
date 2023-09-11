import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  Container,
  Button,
  Spinner,
  Select
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Input } from '@chakra-ui/react'
import { useState, useEffect } from "react"

const API_URL = "http://localhost:8000"

type CustomerInfo = {
  name: string;
  address: string;
  email: string;
}

type Template = {
  uuid: string;
  title: string;
}

const inputStyle = { margin: 10 }

export const App = () => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [spinnerOn, setSpinnerOn] = useState<boolean>(false)
  const [downloadReady, setDownloadReady] = useState<boolean>(false)
  const [templates, setTemplates] = useState<Template[]>([])

  useEffect(() => {
    const fetchTemplates = async () => {
      if (templates.length === 0) {
        const req = await fetch(API_URL + '/templates', {
          method: 'GET',
        })
        const reqTemplates: Template[] = await req.json()
        setTemplates(reqTemplates)
      }
    }
    fetchTemplates()
  }, [])

  const sendCustomerInfo = async (customerInfo: CustomerInfo) => {
    setSpinnerOn(true)
    const res = await fetch(API_URL + "/create-pdf", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customerInfo)
    })
    if (res.status === 200) {
      setSpinnerOn(false)
      setDownloadReady(true)
    } else {
      console.log("asdf")
      setSpinnerOn(false)
      setDownloadReady(false)
    }
  }

  const fetchPdfAndDownload = async () => {
    const res: Response = await fetch(API_URL + "/download-pdf", {
      method: 'GET'
    })
    const blob = await res.blob()
    var file = window.URL.createObjectURL(blob);
    window.open(file, '_blank');
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Container>
              <Input style={inputStyle} placeholder="Name" onChange={(e) => setName(e.target.value)} />
              <Input style={inputStyle} placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
              <Input style={inputStyle} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
              <Select style={inputStyle} placeholder="Select template">
                {templates.length > 0 &&
                  templates.map(t => <option key={t.uuid} value={t.uuid}>{t.title}</option>)
                }
              </Select>
              <Button style={inputStyle} onClick={() => sendCustomerInfo({
                name: name,
                address: address,
                email: email
              })}>{spinnerOn ? <Spinner /> : "Submit"}</Button>
              <Button isDisabled={!downloadReady} onClick={() => fetchPdfAndDownload()}>Download</Button>
            </Container>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}
