/**
 * Exposes important chart objects to global scope.
 * Only for development mode.
 * @doc-tags debug
 */

// @ts-nocheck
export const windowGlobal = {
	multiChartVM: (obj: any) => {
		if (!false) {
			window[`__CHART_MULTICHART_VM`] = obj;
		}
	},
	chartVMS: (chartId: string, obj: any) => {
		if (!false) {
			window[`__CHART_VIEW_MODELS_${chartId}`] = obj;
		}
	},
	actionsHistoryVM: (obj: any) => {
		if (!false) {
			if (!window[`__CHART_VMS`]) {
				window[`__CHART_VMS`] = {};
			}
			window[`__CHART_VMS`]['actionsHistory'] = obj;
		}
	},
	chartReactAPI: (obj: any) => {
		if (!false) {
			window[`__CHART_REACT_API`] = obj;
		}
	},
	chartInstance: (chartId: string, obj: any) => {
		if (!false) {
			window[`__CHART_INSTANCE_${chartId}`] = obj;
		}
	},
	callTracer: (obj: any) => {
		if (!false) {
			if (!window['__CHART_DEBUG']) {
				window['__CHART_DEBUG'] = {};
			}
			window['__CHART_DEBUG']['callTracer'] = obj;
		}
	},
	quotesGenerator: (obj: any) => {
		if (!false) {
			if (!window['__CHART_DEBUG']) {
				window['__CHART_DEBUG'] = {};
			}
			window['__CHART_DEBUG']['quotesGenerator'] = obj;
		}
	},
};