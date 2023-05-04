import React, {useMemo} from "react";
import compatibilityData from "./compatibility.json";
import "./style.css";

const CheckMark = ({fill = "currentColor"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="10.061" height="7.5908" viewBox="0 0 10.061 7.5908">
    <polygon points="3.53 7.591 0 4.061 1.061 3 3.53 5.47 9 0 10.061 1.061 3.53 7.591" fill={fill} />
  </svg>
);

const XMark = ({fill = "currentColor"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
    <path d="M8,0a8,8,0,1,0,8,8A8,8,0,0,0,8,0Zm3.5154,10.2983-1.06,1.0605L8.1567,9.0606l-2.298,2.2982L4.7982,10.2983,7.0961,8,4.7982,5.7021,5.8587,4.6415,8.1567,6.94l2.2982-2.2984,1.06,1.0605L9.2172,8Z" fill={fill} />
  </svg>
);

const Cell = ({item: {implemented, issue} = {}}) => (
  <td>
    <div className="cell">
      {implemented ? <CheckMark fill={"var(--ifm-color-success-lightest)"} /> : <XMark fill={"var(--ifm-color-danger-light)"} />}
      {issue ? (
        <a target="_blank" href={`https://github.com/winglang/wing/issues/${issue}`}>
          #{issue}
        </a>
      ) : (
        ""
      )}
    </div>
  </td>
);

export const Table = () => {
  const headline = useMemo(() => getHeadline(compatibilityData), []);

  return (
    <table id="compatibility-table">
      <thead>
        <tr>
          <th colSpan="2">Resource</th>
          {headline.map((item) => (
            <th align="center" width={100 / headline.length + "%"} key={item}>
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.keys(compatibilityData).map((item) => (
          <>
            <td key={`${item}_main`} className="highlight" rowSpan={Object.keys(compatibilityData[item]).length + 1}>
              <a target="_blank" href={`/reference/wingsdk-spec#${item.toLowerCase()}`}>
                {item}
              </a>
            </td>
            {Object.keys(compatibilityData[item]).map((method) => (
              <tr key={`${item}_${method}`}>
                <td className="highlight" rowSpan={1}>
                  <code>{method}</code>
                </td>
                {headline.map((target) => (
                  <Cell key={`${item}_${method}_${target}`} item={compatibilityData[item][method][target]} />
                ))}
              </tr>
            ))}
          </>
        ))}
      </tbody>
    </table>
  );
};

const getHeadline = (data) => Array.from(Object.values(data).reduce((acc, item) => new Set([...acc, ...Object.values(item).reduce((innerAcc, platforms) => [...innerAcc, ...Object.keys(platforms)], [])]), []));
