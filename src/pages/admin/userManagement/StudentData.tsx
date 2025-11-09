import {
  Button,
  Pagination,
  Space,
  Table,
  type TableColumnsType,
  type TableProps,
} from "antd";
import { useState } from "react";
import type { TQueryParam, TStudent } from "../../../types";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";

export type TTableData = Pick<TStudent, "fullName" | "id">;

const studentData = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const [page, setPage] = useState(1);

  const { data: studentName, isFetching } = useGetAllStudentsQuery([
    { name: "limit", value: "3" },
    { name: "page", value: page },
    {name: "sort", value: "id"},
    ...(params || []),
  ]);

  const metaData = studentName?.meta;

  const tableData = studentName?.data?.map(({ _id, fullName, id }) => ({
    key: _id,
    fullName,
    id,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "fullName",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Roll no",
      dataIndex: "id",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <Space>
            <Button>Details</Button>
            <Button>Update</Button>
            <Button>Block</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action == "filter") {
      const queryParams: TQueryParam[] = [];
      filters.name?.forEach((item) => {
        queryParams.push({ name: "name", value: item });
      });
      setParams(queryParams);
    }
  };

  return (
    <div>
      {" "}
      <Table<TTableData>
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
      <Pagination current={page} onChange={(value) => setPage(value)} pageSize={metaData?.limit} total={metaData?.total}/>
    </div>
  );
};

export default studentData;
