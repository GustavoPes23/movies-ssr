import { type FC } from "react";

import { useAtom } from "jotai/react";
import { RESET } from "jotai/utils";

import { type AuthStateProps, authStateAtom } from "../../state/authState";

const Index: FC = () => {
  const [authAtom, setAuthAtom] = useAtom<AuthStateProps>(authStateAtom);

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Features
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Marketplace
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Company
          </a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <span className="text-sm font-semibold leading-6 text-gray-900 mr-4">
            Olá, {authAtom.name}
          </span>
          <button
            onClick={() => setAuthAtom(RESET as unknown as AuthStateProps)}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Logout <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Index;
