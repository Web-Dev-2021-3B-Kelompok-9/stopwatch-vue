/* eslint-disable linebreak-style */
/* eslint-disable default-case */
/* eslint-disable consistent-return */
// this will be all of ID that will called in the programs

const ID = {
  // Common ID
  TASK_LIST: 'task-list',
  ADD_TASK: 'add-task',
  INPUT_TASK: 'inputTask',
  MODAL: 'modal',
  TIME: 'time-text',
  RESULT: 'result-stopwatch',
};

const MODAL = {
  // only ID from modal
  ADD_TASK_FORM: 'add-task-modal',
  CONFIRMATION: 'confirmation-modal',
  ANSWER: 'confirmation-answer',
};

const BUTTON_ID = {
  // only ID from button element
  ADD: 'add-task-button',
  CLOSE_MODAL: 'close-modal-button',
  START: 'start-button',
  DELETE: 'delete-button',
  PAUSE: 'pause-button',
  NO: 'confirmation-no-button',
  YES: 'confirmation-yes-button',
  STOP: 'stop-button',
};

const INPUT_ID = {
  // only ID from add task form
  TASK_DATE: 'task-date-input',
  TASK_TITLE: 'task-title-input',
};

const STORAGE_KEY = {
  // storage key value name
  TASK_LIST: 'TASK_LIST_STORAGE_KEY',
};

const FONTAWESOME_ICON = {
  // this a little bit different,
  // we use free icon from https://fontawesome.com/
  // it use to identifier the icon and representation icon from fontawesome
  PLAY: '<i class="far fa-play-circle fa-3x" aria-hidden="true"></i>',
  STOP: '<i class="far fa-stop-circle fa-3x" aria-hidden="true"></i>',
  PAUSE: '<i class="far fa-pause-circle fa-3x" aria-hidden="true"></i>',
  DELETE: '<i class="fas fa-trash fa-2x" aria-hidden="true"></i>',
  ADD: '<i class="fas fa-plus-circle fa-3x" aria-hidden="true"></i>',
};

const ICON = (icon) => {
  // return more simple key from font awesome icon identifier
  switch (icon) {
    case FONTAWESOME_ICON.PLAY:
      return 'play';
    case FONTAWESOME_ICON.PAUSE:
      return 'pause';
    case FONTAWESOME_ICON.STOP:
      return 'stop';
    case FONTAWESOME_ICON.DELETE:
      return 'delete';
    case FONTAWESOME_ICON.ADD:
      return 'add';
  }
};

export { ID, BUTTON_ID, INPUT_ID, STORAGE_KEY, ICON, FONTAWESOME_ICON, MODAL };
