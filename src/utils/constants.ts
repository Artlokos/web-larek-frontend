import { CategoryMapping } from "../types";

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {

};

export const categoryMapping: CategoryMapping = {
	другое: 'card__category_other',
	'софт-скил': 'card__category_soft',
	дополнительное: 'card__category_additional',
	кнопка: 'card__category_button',
	'хард-скил': 'card__category_hard',
  };

export const regAddress = {
	name: {
		presence: { message: '^Поле не может быть пустым', allowEmpty: false },
		length: {
			minimum: 2,
      tooShort: "^Слишком короткий адрес, необходимо %{count} буквы или больше",
      },
		format: {
			pattern: /^[a-zA-Zа-яА-ЯёЁ\- ]+$/,
			message:
				'^Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы',
		},
	}
};

export const regEmail = {
	name: {
		presence: { message: '^Поле не может быть пустым', allowEmpty: false },
		length: {
			minimum: 2,
      tooShort: "^Слишком короткий адрес электронной почты, необходимо %{count} буквы или больше",
      },
		format: {
			pattern: /^[a-zA-Zа-яА-ЯёЁ\- ]+$/,
			message:
				'^Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы',
		},
	}
};

export const checkTelephone = {
	name: {
		presence: { message: '^Поле не может быть пустым', allowEmpty: false },
		length: {
			minimum: 2,
      tooShort: "^Слишком короткий номер телефона, необходимо %{count} буквы или больше",
      },
		format: {
			pattern: /^[a-zA-Zа-яА-ЯёЁ\- ]+$/,
			message:
				'^Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы',
		},
	}
};