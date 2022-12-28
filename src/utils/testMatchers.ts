/* eslint-disable testing-library/no-container */
import { axe, prettyDOM, render, RenderOptions } from '@/test-utils';

/**
 * Renders the React component on a virtual DOM and confirms that there are no 508 accessibility violations. This uses
 * jest-axe to run the test.
 *
 * @param component The React component to test
 * @param rules Optional rules passed to the axe method when evaluating accessibility rules.
 */
export const expectRendersWithoutViolations = async (
  component: React.ReactElement,
  rules?: Record<string, unknown>
) => {
  const { container } = render(component);
  const results = await axe(container, { rules });
  expect(results).toHaveNoViolations();
};

/**
 * This method performs a recursive test on the passed element. It will check the classList of each element
 * and confirm that any CSS class that starts with "usa-" also has the corresponding "lf-" class with it.
 * If the component has usa-label, then it MUST have lf-label and this method will fail the test if it does not.
 *
 * @param component The React Component or HTML Element to check.
 * @param options Rendering options for the render method ( only used for React.HTMLElement type )
 */
export const expectToHaveLightFeatherCssClasses = (
  component: React.ReactElement | HTMLElement,
  options?: RenderOptions
) => {
  const checkComponent = (container: HTMLElement) => {
    container.classList.forEach((value) => {
      if (value.startsWith('usa-')) {
        const lfClass = `lf-${value.substring(4)}`;
        try {
          expect(container.className).toContain(lfClass);
        } catch (e) {
          console.log(prettyDOM(container));
          throw e;
        }
      }
    });

    for (let i = 0; i < container.children.length; i++) {
      const currentItem = container.children.item(i);

      if (currentItem instanceof HTMLElement) checkComponent(currentItem);
    }
  };

  if (component instanceof HTMLElement) {
    checkComponent(component);
  } else {
    const { container: domContainer } = render(component, options);
    checkComponent(domContainer);
  }
};
