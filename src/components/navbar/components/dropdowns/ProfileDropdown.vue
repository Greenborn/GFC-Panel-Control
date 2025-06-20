<template>
  <div class="profile-dropdown-wrapper">
    <VaDropdown
      v-model="isShown"
      :offset="[9, 0]"
      class="profile-dropdown"
      stick-to-edges
    >
      <template #anchor>
        <VaButton preset="secondary" color="textPrimary">
          <span class="profile-dropdown__anchor min-w-max">
            <slot />
            <VaAvatar :size="32" color="warning"> <img :src="get_img_profile()" /> </VaAvatar>
          </span>
        </VaButton>
      </template>
      <VaDropdownContent
        class="profile-dropdown__content md:w-60 px-0 py-4 w-full"
        :style="{ '--hover-color': hoverColor }"
      >
        <VaList v-for="group in options" :key="group.name">
          <header
            v-if="group.name"
            class="uppercase text-[var(--va-secondary)] opacity-80 font-bold text-xs px-4"
          >
            {{ t(`user.${group.name}`) }}
          </header>
          <VaListItem
            v-for="item in group.list"
            :key="item.name"
            class="menu-item px-4 text-base cursor-pointer h-8"
            v-bind="resolveLinkAttribute(item)"
          >
            <VaIcon :name="item.icon" class="pr-1" color="secondary" />
            {{ t(`user.${item.name}`) }}
          </VaListItem>
          <VaListSeparator v-if="group.separator" class="mx-3 my-2" />
        </VaList>
      </VaDropdownContent>
    </VaDropdown>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useColors } from "vuestic-ui";

import { get_img_profile } from '../../../../api/auth'

const { colors, setHSLAColor } = useColors();
const hoverColor = computed(() => setHSLAColor(colors.focus, { a: 0.1 }));

const { t } = useI18n();

const options = ref([
      /*{
        name: "account",
        separator: true,
        list: [
          {
            name: "profile",
            to: "preferences",
            icon: "mso-account_circle",
          },
        ],
      },*/
      {
        name: "",
        separator: false,
        list: [
          {
            name: "logout",
            to: "login",
            icon: "mso-logout",
          },
        ],
      },
    ])

const isShown = ref(false);

const resolveLinkAttribute = (item) => {
  return item.to
    ? { to: { name: item.to } }
    : item.href
      ? { href: item.href, target: "_blank" }
      : {};
};
</script>

<style lang="scss">
.profile-dropdown {
  cursor: pointer;

  &__content {
    .menu-item:hover {
      background: var(--hover-color);
    }
  }

  &__anchor {
    display: inline-block;
  }
}
</style>
