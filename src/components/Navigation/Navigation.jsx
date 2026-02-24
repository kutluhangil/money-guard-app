import React from "react";
import Icon from "../Icon/Icon";
import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={css.navContainer}>
      <ul className={css.navList}>
        {/* Home */}
        <li className={css.navItem}>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? css.active : css.navButton
            }
            end
          >
            <Icon name="icon-icon-home" className={css.navIcon} />
            <span className={css.navText}>Home</span>
          </NavLink>
        </li>

        {/* Statistics */}
        <li className={css.navItem}>
          <NavLink
            to="/statistics"
            className={({ isActive }) =>
              isActive ? css.active : css.navButton
            }
          >
            <Icon name="icon-icon-statistics" className={css.navIcon} />
            <span className={css.navText}>Statistics</span>
          </NavLink>
        </li>

        {/* Currency (sadece mobil) */}
        <li className={`${css.navItem} ${css.mobileOnly}`}>
          <NavLink
            to="/currency"
            className={({ isActive }) =>
              isActive ? css.active : css.navButton
            }
          >
            <Icon name="icon-icon-currency" className={css.navIcon} />
            {/* Mobil için sadece ikon, metin yok */}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
