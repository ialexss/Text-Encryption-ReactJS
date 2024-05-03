import { useState } from "react"
import { Textarea, Button, Input } from "@nextui-org/react"
import CryptoJS from "crypto-js"

function App() {

  const [textToEncrypt, setTextToEncrypt] = useState("")
  const [textEncryptResult, setTextEncryptResult] = useState("")
  const [textToDecrypt, setTextToDecrypt] = useState("")
  const [textDecryptResult, setTextDecryptResult] = useState("")
  const [secretPhrase, setSecretPhrase] = useState("")
  const [isLoadingEncrypt, setisLoadingEncrypt] = useState(false)
  const [isLoadingDecrypt, setisLoadingDecrypt] = useState(false)


  const encrypt = () => {
    setisLoadingEncrypt(true);
    try {
      const textEncrypt = CryptoJS.AES.encrypt(textToEncrypt, secretPhrase).toString();
      const encryptedBase64 = btoa(textEncrypt);
      setTextEncryptResult(encryptedBase64);
    } catch (error) {
      console.error("Error al encriptar:", error);
    }
    setisLoadingEncrypt(false);
  };

  const decrypt = () => {
    setisLoadingDecrypt(true);
    try {
      const encryptedText = atob(textToDecrypt);
      const bytes = CryptoJS.AES.decrypt(encryptedText, secretPhrase);
      const textDecrypt = bytes.toString(CryptoJS.enc.Utf8);
      setTextDecryptResult(textDecrypt);
    } catch (error) {
      console.error("Error al desencriptar:", error);
      setisLoadingDecrypt(false);
    }
    setisLoadingDecrypt(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log("Texto copiado al portapapeles:", text);
      })
      .catch((error) => {
        console.error("Error al copiar al portapapeles:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 dark:bg-zinc-950 dark:text-white p-10">
      <h1 className="md:text-5xl text-4xl my-5">ENCRIPTACIÓN</h1>
      <div className="max-w-xl w-full p-5">
        <Input
          type="password"
          variant="bordered"
          label="Frase secreta"
          className="w-full"
          value={secretPhrase}
          onValueChange={setSecretPhrase}

        />
        <Button variant="light" size="sm" className="w-full text-zinc-500" onPress={() => copyToClipboard(secretPhrase)}>Copiar frase</Button>
      </div>
      <div className="md:flex gap-5 items-start w-full justify-center">
        <div className="p-5 shadow-md bg-white rounded-lg flex flex-col gap-2 max-w-lg w-full md:my-0 my-5">
          <h2>Encriptar</h2>
          <Textarea
            label="Cadena de texto"
            value={textToEncrypt}
            onValueChange={setTextToEncrypt}
          />
          <Button className="bg-zinc-700 text-white" onPress={encrypt} isLoading={isLoadingEncrypt} >Encriptar</Button>
          <p>Resultado:</p>
          <div className="min-h-24 bg-zinc-100 rounded-xl overflow-auto p-2">
            <p className="text-wrap">{textEncryptResult}</p>
          </div>
          <Button  variant="light" size="sm" onPress={() => copyToClipboard(textEncryptResult)}>Copiar</Button>
        </div>
        <div className="p-5 shadow-md bg-white rounded-lg flex flex-col gap-2 max-w-lg w-full" >
          <h2>Desencriptar</h2>
          <Textarea
            label="Cadena encriptada"
            value={textToDecrypt}
            onValueChange={setTextToDecrypt}
          />
          <Button className="bg-zinc-700 text-white" onPress={decrypt} isLoading={isLoadingDecrypt}>Desencriptar</Button>
          <p>Resultado:</p>
          <div className="min-h-24 bg-zinc-100 rounded-xl overflow-auto p-2">
            <p className="text-wrap">{textDecryptResult}</p>
          </div>
          <Button variant="light" size="sm" onPress={() => copyToClipboard(textDecryptResult)}>Copiar</Button>
        </div>
      </div>
      <p className="my-2">© Alexander Sanchez Salces</p>
    </div>
  )
}

export default App
