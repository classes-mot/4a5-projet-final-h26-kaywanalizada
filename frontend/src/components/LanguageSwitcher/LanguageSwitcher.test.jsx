import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import LanguageSwitcher from "./LanguageSwitcher";

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        i18n: { 
            changeLanguage: vi.fn()
        }
    })
}))

describe("LanguageSwitcher", () => {
    it("Affiche le bouton FR", () => {
        render(<LanguageSwitcher />)
        expect(screen.getByText("FR")).toBeInTheDocument();
    })
})
