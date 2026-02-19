"use client";

import { User } from "@/domain/user";
import { useUser } from "@/feature/getUser/UserProvider";
import SelectAccountDropdown from "@/feature/selectAccount/selectAccountDropdown";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Divider,
  Avatar,
} from "@heroui/react";

interface HeaderProps {
  showAccountSelector?: boolean;
}

export default function Header(props: HeaderProps) {
  const user: User = useUser();

  return (
    <Navbar>
      <NavbarBrand>LOGO</NavbarBrand>
      <NavbarContent justify="end">
        {props.showAccountSelector && (
          <NavbarItem>
            <SelectAccountDropdown />
          </NavbarItem>
        )}
        <NavbarItem className="flex items-center gap-1">
          <Avatar
            showFallback
            name={(user.firstName + " " + user.lastName).trim()}
          />
          <p>{user.email}</p>
        </NavbarItem>
        <Divider className="my-0" orientation="vertical" />
        <NavbarItem>
          <Button>Logout</Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
