const { createStepPlayer } = require('../src/core/stepPlayer');

describe('stepPlayer', () => {
  const steps = [
    { kind: 'state', payload: { index: 0 } },
    { kind: 'visit', payload: { index: 1 } },
    { kind: 'state', payload: { done: true } },
  ];

  test('next/prev/seek가 경계를 벗어나지 않는다', () => {
    const player = createStepPlayer(steps);

    expect(player.getCurrentStep()).toEqual(steps[0]);
    expect(player.next()).toEqual(steps[1]);
    expect(player.next()).toEqual(steps[2]);
    expect(player.next()).toEqual(steps[2]);

    expect(player.prev()).toEqual(steps[1]);
    expect(player.seek(0)).toEqual(steps[0]);
    expect(player.seek(999)).toEqual(steps[2]);
  });

  test('play/pause/setSpeed가 상태를 반영한다', () => {
    const player = createStepPlayer(steps);

    player.play();
    player.setSpeed(1.5);
    expect(player.getState()).toMatchObject({ isPlaying: true, speed: 1.5 });

    player.pause();
    expect(player.getState()).toMatchObject({ isPlaying: false });
  });

  test('0 이하 speed는 예외를 던진다', () => {
    const player = createStepPlayer(steps);

    expect(() => player.setSpeed(0)).toThrow('재생 속도는 0보다 큰 숫자여야 합니다.');
  });
});
