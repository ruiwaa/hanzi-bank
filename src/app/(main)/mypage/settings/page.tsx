import SettingsSection from "./components/SettingsSection";

export default function MySettings() {
  return (
    <div className="desktop-layout flex flex-col gap-1 p-5">
      <h1 className="text-2xl font-bold">설정</h1>
      <p className="text-gray-500 text-sm pb-3">
        프로필 편집, 회원 탈퇴 등 설정할 수 있어요.
      </p>
      <SettingsSection />
    </div>
  );
}
