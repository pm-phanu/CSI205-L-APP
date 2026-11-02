"use client";
import { useRouter } from "next/navigation";
import { Backdrop } from "@/components/tailgrids/core/overlay";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
} from "@/components/tailgrids/core/dialog";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/tailgrids/core/input-group";
import { EyeDisabled, Keyboard, Locked3 } from "@tailgrids/icons";
import { Credential, login } from "@/data/credential";

export default function Page() {
  const router = useRouter()
  const handleLogin = () => {
    // extrat data
    const userDom = document.getElementById("user") as HTMLInputElement;
    const passDom = document.getElementById("pass") as HTMLInputElement;

    const user = userDom.value.trim();
    const pass = passDom.value.trim();

    // validate
    if (user === "") {
      userDom.focus();
      alert("Error: user is required");
      return;
    }
    if (pass === "") {
      passDom.focus();
      alert("Error: password is required");
      return;
    }

    // call login (api)
    login(`${user}@company.com`, pass)
      .then((credential) => {
        localStorage.setItem("credential", JSON.stringify(credential))
        const returnPath = localStorage.getItem('returnPath') || '/'
        localStorage.removeItem('returnPath')
        router.replace(returnPath)
        router.refresh()
      })
      .catch((error) => {
        userDom.value = ''
        passDom.value = ''
        userDom.focus()
        alert(`Error: ${error}`);
      });
  };

  return (
    <Backdrop isOpen={true}>
      <Dialog showCloseButton={false} className="w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Who are you</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <Keyboard />
            </InputGroupAddon>
            <InputGroupInput id="user" placeholder="admin | user | manager" />
            <InputGroupAddon align="inline-end">@company.com</InputGroupAddon>
          </InputGroup>
          <InputGroup className="mt-2">
            <InputGroupAddon align="inline-start">
              <Locked3 />
            </InputGroupAddon>
            <InputGroupInput id="pass" type="password" placeholder="pass" />
          </InputGroup>
        </DialogBody>
        <DialogFooter>
          <div className="flex justify-end">
            <DialogClose
              onClick={() => {
                handleLogin();
              }}
              appearance="outline"
            >
              Login
            </DialogClose>
          </div>
        </DialogFooter>
      </Dialog>
    </Backdrop>
  );
}
